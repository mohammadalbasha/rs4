import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsDefined,
  Validate,
  IsEnum,
} from 'class-validator';
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

export class SurnameCreateInputCentral extends BaseCreateInput('surname') {
  @Validate(UniqueValidator, ['surname', 'surname'])
  @IsDefined()
  @IsString()
  @ApiProperty()
  surname: string;

  @Type(() => LocaleField)
  @IsDefined()
  @IsEnum(LocaleFieldEnum)
  @ApiProperty({
    enum: {
      LocaleFieldEnum,
    },
    enumName: 'Locale Field',
    examples: [LocaleFieldEnum.ar, LocaleFieldEnum.en],
  })
  locale: LocaleField;

  // @ApiProperty({
  //   isArray: true,
  //   type: Number,
  //   minimum: 1,
  // })
  // @ApiProperty()
  // @Validate(IsRef, ['country'])
  // countries: number[];
}

export class SurnameUpdateInputCentral extends BaseUpdateInput(
  SurnameCreateInputCentral,
) {}

class SurnameFilterInputCentral extends BaseFilterInput {}
export class SurnameListInputCentral extends BaseListInput(
  ['surname'],
  SurnameFilterInputCentral,
) {}
