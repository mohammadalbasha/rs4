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

import { MyClsStore } from '../../cls/cls.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModels } from '../../prisma/prismaModels.type';

interface IsRefValidationArguments extends ValidationArguments {
  constraints: [PrismaModels, Object];
}

@ValidatorConstraint({ name: 'isRef', async: true })
@Injectable()
export class IsRef implements ValidatorConstraintInterface {
  constructor(
    private prisma: PrismaService,
    private readonly cls: ClsService<MyClsStore>,
  ) {}

  public async validate(
    value: number | Array<number>,
    args: IsRefValidationArguments,
  ) {
    if (value === undefined) return true;

    // check if valid ids
    if (Array.isArray(value)) {
      // if (!arrayUnique(value)) {
      //   (args as any).arrayNotUnique = true
      //   return false
      // }
      for (const v of value) {
        if (!Number.isInteger(v)) return false;
      }
    } else {
      if (!Number.isInteger(value)) return false;
    }

    // no constraints
    if (args.constraints === undefined) {
      return true;
    }

    // TODO:
    // accept the id from req.pqrams
    // const id = this.cls.get('req').params?.id;

    // let [Model, where, checkCallback] = args.constraints;
    let [entityName, where] = args.constraints;
    const entity = this.prisma.getEntity(entityName) as any;

    if (!where) where = {};
    where = {
      // isActive: true,
      ...where,
    };

    if (Array.isArray(value)) {
      for (const v of value) {
        // if (!mongoose.Types.ObjectId.isValid(v)) return false
        const result = await entity.findFirst({
          where: {
            id: v,
            ...where,
          },
        });

        if (!result) return false;
        // if (checkCallback && !(await checkCallback(result, this.connection, this.connection))) {
        //   return false
        // }
      }
      return true;
    } else {
      const result = await entity.findFirst({
        where: {
          id: value,
          ...where,
        },
      });
      if (!result) return false;
      // if (checkCallback && !(await checkCallback(result, this.connection, this.connection))) {
      //   return false
      // }
      return true;
    }
  }

  public defaultMessage(args: ValidationArguments) {
    // if ((args as any).arrayNotUnique) {
    //   return `All {property}'s elements must be unique`
    // }
    return `invalid ${args.property} value`;
    // if (args.constraints === undefined) {
    //   return `invalid ${args.property} id`;
    // } else {
    //   // const [entity] = args.constraints;
    //   // const entity = EntityClass.name || 'Entity';
    //   return `could not find ${args.property} id`;
    // }
  }
}

export function IsRef2(
  constraints:
    | IsRefValidationArguments['constraints']
    | [PrismaModels]
    | PrismaModels,
  validationOptions?: ValidationOptions,
) {
  // if (!Array.isArray(constraints)) {
  //   console.log(constraints)
  //   constraints = [constraints] as any
  // }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      // name: 'isRef',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [constraints],
      validator: IsRef,
    });
  };
}
