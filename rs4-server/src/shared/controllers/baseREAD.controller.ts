import { Ability, PureAbility } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { Action } from 'src/authorization/casl/action.enum';
import { Can } from 'src/authorization/casl/can.decorator';
import { CurrentAbility } from 'src/authorization/casl/currentAbility.decorator';

import { ApiNestedQuery } from '../decorators/apiNestedQuery.decorator';
import { getPrismaWhereByFilterDto } from '../decorators/filterType.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModels } from '../prisma/prismaModels.type';
import { BaseController } from './base.controller';
import { BaseListInputClass } from './base.input';
import IfDecorator from './IfDecorator.decorator';
import { CentralUser } from '@prisma/client';

interface ControllerOptions {
  hasReadItem?: boolean;
  hasReadList?: boolean;
}

export default function BaseReadController<
  ListInput extends BaseListInputClass,
  Model,
>(
  Path: string,
  Model: PrismaModels,
  ListInput: Type<ListInput>,
  opts: ControllerOptions = {},
) {
  const defaultOptions: ControllerOptions = {
    hasReadItem: true,
    hasReadList: true,
  };
  const options: ControllerOptions = Object.assign({}, defaultOptions, opts);

  @ApiTags(Path)
  @Controller(Path)
  abstract class BaseReadController extends BaseController {
    public model;
    public RelationFields: (keyof Model)[];

    constructor(public prisma: PrismaService) {
      super();
      this.model = this.prisma.getEntity(Model);
    }

    //   public populateFields() {
    //       return [
    //       ]
    //   }
    //   public whereData(filterBy:FilterInput, user:User)/*: Partial<Model> mohammad albacha*/ {
    //       return filterBy;
    //   }
    public whereData(
      filterBy: ListInput['filter'],
      user: CentralUser,
    ) /*: Partial<Model> mohammad albacha*/ {
      return filterBy;
    }

    // Relation Fields should be array like this
    // ['countries', {payoutMethod: ['countries', currencies']}]
    // this will be converted to
    // {
    //   countries : true,
    //   payoutMethod: {
    //     select: {
    //       countries: true,
    //       currencies: true
    //     }
    //   }
    // }

    public convertRelationFields(arr) {
      if (Array.isArray(arr)) {
        const result = {};
        arr.forEach((item) => {
          if (typeof item === 'string') {
            result[item] = true;
          } else {
            const [key, nestedArr] = Object.entries(item)[0];
            result[key] = {
              select: { ...this.convertRelationFields(nestedArr) },
            };
          }
        });
        return result;
      } else {
        return {};
      }
    }

    /* mohammad albacha */
    /* I found that Read Authorization applied by .accessible
          while Create/Update/Delete Authorization applied by @Can on the resolver handler*/
    @Can([Action.Read, Model])
    @IfDecorator(options.hasReadItem, Get(':id'))
    async item(
      @CurrentUser() user: CentralUser,
      @CurrentAbility() ability: PureAbility,
      @Param('id') id: number,
    ) {
      // const populateFields = this.RelationFields?.reduce(
      //   (accumulator, value) => {
      //     return { ...accumulator, [value]: true };
      //   },
      //   {},
      // );
      const populateFields = this.convertRelationFields(this.RelationFields);

      const data = await this.prisma.getEntity(Model).findFirstOrThrow({
        where: { AND: [accessibleBy(ability)[Model], { id }] },
        ...(this.RelationFields?.length > 0 && {
          include: {
            ...populateFields,
          },
        }),
      });

      if (!data) throw new NotFoundException();
      return { data, meta: {} };
    }

    @Can([Action.Read, Model])
    @IfDecorator(options.hasReadList, Get())
    @ApiNestedQuery(ListInput)
    @UseInterceptors(ClassSerializerInterceptor)
    async items(
      @CurrentUser() user: CentralUser,
      @Query() listInput: ListInput,
      @CurrentAbility() ability: PureAbility,
    ) {
      console.log(listInput);
      const whereData = {
        AND: [
          accessibleBy(ability)[Model],
          this.whereData(getPrismaWhereByFilterDto(listInput.filter), null),
        ],
      };

      // const populateFields: any = {};
      // RelationFields.forEach((value) => {
      //   populateFields[value] = true;
      // });
      // const populateFields = this.RelationFields?.reduce(
      //   (accumulator, value) => {
      //     return { ...accumulator, [value]: true };
      //   },
      //   {},
      // );
      const populateFields = this.convertRelationFields(this.RelationFields);

      const data = await this.prisma.getEntity(Model).findMany({
        ...(this.RelationFields?.length > 0 && {
          include: {
            ...populateFields,
          },
        }),
        where: whereData,
        skip: listInput.pagination ? listInput.pagination.offset : 0,
        take: listInput.pagination ? listInput.pagination.limit : 25,
        orderBy: listInput.order
          ? { [listInput.order.field]: listInput.order.direction }
          : { id: 'desc' },
      });
      const count = await this.prisma
        .getEntity(Model)
        .count({ where: whereData });

      return { data, meta: { count } };
    }
  }

  return BaseReadController;
}
