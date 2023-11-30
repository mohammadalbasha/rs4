import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClsService } from 'nestjs-cls';

import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModels } from '../../prisma/prismaModels.type';
import { MyClsStore } from 'src/shared/cls/cls.interface';

interface UniqueValidationArguments extends ValidationArguments {
  constraints: [PrismaModels, string, string?];
}

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    private prisma: PrismaService,
    private readonly cls: ClsService<MyClsStore>,
  ) {}

  async validate(value: string, args: UniqueValidationArguments) {
    const [entityName, column, except] = args.constraints;

    const entity = this.prisma.getEntity(entityName) as any;

    let where = { [column]: value };
    const id = this.cls.get('req').params?.id;
    if (id) {
      where = Object.assign(where, { NOT: { id: parseInt(id) } });
    }

    // // third parameter to the validator
    // // if (except) {
    // //   where = Object.assign(where, { id: { not: args.object[except] } })
    // // }

    // const result = await this.connection.models[Model.name].findOne(where)

    const result = await entity.findFirst({ where: where });
    return result ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    const [entity] = args.constraints;
    // const entity = EntityClass.name || 'Entity';
    return `${args.property} value already exist`;
  }
}

export function IsUnique(
  constraints: UniqueValidationArguments['constraints'],
  validationOptions?: ValidationOptions,
) {
  // if (!Array.isArray(constraints)) {
  //   console.log(constraints)
  //   constraints = [constraints] as any
  // }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      // name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [constraints],
      validator: UniqueValidator,
    });
  };
}
