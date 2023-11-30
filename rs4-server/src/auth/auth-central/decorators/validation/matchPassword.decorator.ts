import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PrismaModels } from 'src/shared/prisma/prismaModels.type';

interface MatchPasswordValidationArguments extends ValidationArguments {
  constraints: [];
}

@ValidatorConstraint({ name: 'matchPassword', async: true })
@Injectable()
export class MatchPassword implements ValidatorConstraintInterface {
  public async validate<E>(
    value: string,
    args: MatchPasswordValidationArguments,
  ) {
    // @ts-ignore
    return value == args.object.password;
  }

  public defaultMessage(args: ValidationArguments) {
    return `passwords must match`;
  }
}

export function IsMatch(
  constraints: MatchPasswordValidationArguments['constraints'],
  validationOptions?: ValidationOptions,
) {
  // if (!Array.isArray(constraints)) {
  //   console.log(constraints)
  //   constraints = [constraints] as any
  // }
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [constraints],
      validator: MatchPassword,
    });
  };
}

// THE DIFFERENCE THAT
// isMatch , the decorator registered here
// MatchPassword need to be used with Validate Decorator

//@Validate(MatchPassword)
// @IsMatch([])
