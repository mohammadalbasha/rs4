import { PureAbility } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
  Post,
  Put,
  Type,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CentralUser, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { Action } from 'src/authorization/casl/action.enum';
import { Can } from 'src/authorization/casl/can.decorator';
import { CurrentAbility } from 'src/authorization/casl/currentAbility.decorator';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModels } from '../prisma/prismaModels.type';
import { BaseController } from './base.controller';
import { BaseListInputClass } from './base.input';
import BaseReadController from './baseREAD.controller';
import IfDecorator from './IfDecorator.decorator';

interface ControllerOptions {
  hasReadItem?: boolean;
  hasReadList?: boolean;
  hasCreate?: boolean;
  hasUpdate?: boolean;
  hasDelete?: boolean;
  hasDeleteMany?: boolean;
}

export default function BaseCRUDController<
  ListInput extends BaseListInputClass,
  CreateInput,
  UpdateInput,
>(
  Path: string,
  Model: PrismaModels,
  ListInput: Type<ListInput>,
  CreateInput: Type<CreateInput>,
  UpdateInput: Type<UpdateInput>,
  opts: ControllerOptions = {},
) {
  const defaultOptions: ControllerOptions = {
    hasReadItem: true,
    hasReadList: true,
    hasCreate: true,
    hasUpdate: true,
    hasDelete: true,
    hasDeleteMany: false,
  };
  const options: ControllerOptions = Object.assign({}, defaultOptions, opts);

  @ApiTags(Path)
  @Controller(Path)
  class BaseCRUDController extends BaseReadController(Path, Model, ListInput) {
    public model;
    constructor(public prisma: PrismaService) {
      super(prisma);
      this.model = this.prisma.getEntity(Model);
    }

    public async createData(data: CreateInput, user: CentralUser) {
      return {
        ...data,
      };
    }
    public async updateData(data: UpdateInput, user: CentralUser) {
      return {
        ...data,
      };
    }

    public async canUpdate(
      item,
      data: UpdateInput,
      user: CentralUser,
    ): Promise<boolean> {
      return true;
    }

    public async canDelete(item, user: CentralUser): Promise<boolean> {
      return true;
    }

    public async dataValidation(
      data: CreateInput | UpdateInput,
      user: CentralUser,
      ability: PureAbility,
    ) {}

    public async afterCreate(item) {}

    public async afterUpdate(item) {}

    @Can([Action.Create, Model])
    @IfDecorator(options.hasCreate, Post())
    async create(
      @CurrentUser() user: CentralUser,
      @CurrentAbility() ability: PureAbility,
      @Body() data: CreateInput,
    ) {
      await this.dataValidation(data, user, ability);

      const createData = await this.createData(data, user);
      const newItem = await this.model.create({
        data: { ...createData },
      });

      this.afterCreate(newItem);
      return newItem;
    }

    @Can([Action.Update, Model])
    @IfDecorator(options.hasUpdate, Put(':id'))
    async update(
      @CurrentUser() user: CentralUser,
      @CurrentAbility() ability: PureAbility,
      @Body() data: UpdateInput,
      @Param('id') id: number,
      // @EntityParam(Model) item:Model
    ) {
      const populateFields = this.RelationFields?.reduce(
        (accumulator, value) => {
          return { ...accumulator, [value]: true };
        },
        {},
      );
      // canUpdate can be removed and rely on accessibleBy with casl
      const item = await this.model.findFirstOrThrow({
        where: { AND: [accessibleBy(ability)[Model], { id }] },
        ...(this.RelationFields?.length > 0 && {
          include: {
            ...populateFields,
          },
        }),
      });
      if (!item) {
        throw new UnauthorizedException();
      }
      const canUpdateResult = await this.canUpdate(item, data, user);
      if (canUpdateResult) {
        const updateData = await this.updateData(data, user);
        const updatedRecord = await this.model.update({
          where: { id: item.id },
          data: {
            ...updateData,
          },
          ...(this.RelationFields?.length > 0 && {
            include: {
              ...populateFields,
            },
          }),
        });
        this.afterUpdate(item);
        return updatedRecord;

        // return await this.model.update({
        //   where: { accessibleBy: accessibleBy(ability)[Model], id },
        //   data: {
        //     ...updateData,
        //   },
        // });

        //   .populate(this.populateFields())
      } else {
        throw new ForbiddenException();
      }
    }

    @Can([Action.Delete, Model])
    @IfDecorator(options.hasDelete, Delete(':id'))
    async delete(
      @CurrentUser() user: CentralUser,
      @CurrentAbility() ability: PureAbility,
      @Param('id') id: number,
      // @EntityParam(Model) item:Model
    ) {
      // canDelete can be removed and rely on accessibleBy with casl
      const item = await this.model.findFirstOrThrow({
        where: { id: id },
      });
      if (await this.canDelete(item, user)) {
        return await this.model.deleteMany({
          where: { AND: [accessibleBy(ability)[Model], { id }] },
        });
      } else {
        throw new ForbiddenException();
      }
    }

    @Can([Action.Delete, Model])
    @IfDecorator(options.hasDeleteMany, Post('/delete-many'))
    async deleteMany(
      @CurrentUser() user: CentralUser,
      @CurrentAbility() ability: PureAbility,
      @Body('id') data: number[],
    ) {
      console.log(data);
      //  this code could be cleaner
      for (let id of data) {
        const item = await this.model.findFirstOrThrow({
          where: { id: id },
        });
        if (!item) throw new NotFoundException('item not found');
        await this.canDelete(item, user);
      }

      // canDelete can be removed and rely on accessibleBy with casl

      return await this.model.deleteMany({
        where: {
          AND: [
            accessibleBy(ability)[Model],
            {
              id: {
                in: data,
              },
            },
          ],
        },
      });
    }
  }

  return BaseCRUDController;
}
