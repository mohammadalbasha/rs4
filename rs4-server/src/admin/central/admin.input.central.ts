import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Validate,
  ValidateNested,
  validate,
} from 'class-validator';
import { MatchPassword } from 'src/auth/auth-central/decorators/validation/matchPassword.decorator';
import {
  BaseCreateInput,
  BaseFilterInput,
  BaseListInput,
  BaseOrderInputInArray,
  BaseUpdateInput,
} from 'src/shared/controllers/base.input';
import { FilterType } from 'src/shared/decorators/filterType.decorator';
import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
import {
  IsUnique,
  UniqueValidator,
} from 'src/shared/decorators/validation/unique.input.decorator';
import { LocaleField, LocaleFieldEnum } from 'src/shared/dtos/localeField.dts';

export class CentralUserCreateInputCentral extends BaseCreateInput(
  'centralUser',
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Validate(UniqueValidator, ['centralUser', 'email'])
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @Validate(MatchPassword)
  // @IsMatch([])
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  confirmPass!: string;
}

export class CentralUserUpdateInputCentral extends BaseUpdateInput(
  CentralUserCreateInputCentral,
) {}

class CentralFilterInput extends BaseFilterInput {}
export class CentralUserListInputCentral extends BaseListInput(
  ['centralUser'],
  CentralFilterInput,
) {}
