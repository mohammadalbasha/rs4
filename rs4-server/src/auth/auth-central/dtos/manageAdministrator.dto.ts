import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
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
import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
import { UniqueValidator } from 'src/shared/decorators/validation/unique.input.decorator';
import { UpdateAdministratorInput } from 'src/user/central/dtos/update.dto';

import {
  IsMatch,
  MatchPassword,
} from '../decorators/validation/matchPassword.decorator';
import { LocaleField } from 'src/shared/dtos/localeField.dts';
import { PureAbility } from '@casl/ability';
import {
  BaseFilterInput,
  BaseListInput,
  BaseUpdateInput,
} from 'src/shared/controllers/base.input';

export class CreateCentralInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @Validate(UniqueValidator, ['centralUser', 'email'])
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @Validate(IsRef, ['role'])
  @ApiProperty()
  @IsDefined()
  @IsArray()
  roles: number[];

  @Validate(MatchPassword)
  // @IsMatch([])
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  confirmPass!: string;
}

export class updateCentralInput extends BaseUpdateInput(CreateCentralInput) {}

class CentralFilterInput extends BaseFilterInput {}
export class CentralListInput extends BaseListInput(
  ['centralUser'],
  CentralFilterInput,
) {}
