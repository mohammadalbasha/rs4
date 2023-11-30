import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsString, ValidateNested, IsDefined, Validate } from 'class-validator';
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
import { LocaleField } from 'src/shared/dtos/localeField.dts';

export class GroupCreateInputCentral extends BaseCreateInput('group') {
  @Validate(UniqueValidator, ['group', 'group'])
  @IsDefined()
  @IsString()
  @ApiProperty()
  group: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  color: string;

  // @ApiProperty({
  //   isArray: true,
  //   type: Number,
  //   minimum: 1,
  // })
  // @ApiProperty()
  // @Validate(IsRef, ['country'])
  // countries: number[];
}

export class GroupUpdateInputCentral extends BaseUpdateInput(
  GroupCreateInputCentral,
) {}

class GroupFilterInputCentral extends BaseFilterInput {}
export class GroupListInputCentral extends BaseListInput(
  ['group'],
  GroupFilterInputCentral,
) {}
