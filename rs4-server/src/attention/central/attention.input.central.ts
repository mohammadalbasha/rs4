import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsBoolean,
  IsDefined,
  Validate,
  IsEnum,
  IsArray,
  IsEmail,
  IsOptional,
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

enum PrimarySurnameEnum {
  sa3adt = 'sa3adt',
  ma3ali = 'ma3ali',
  mr = 'mr',
  yourExcelleny = 'yourExcelleny',
}
class PrimarySurname {
  sa3adt: string;
  ma3ali: string;
  mr: string;
  yourExcelleny: string;
}

export class AttentionCreateInputCentral extends BaseCreateInput('attention') {
  @IsDefined()
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @ApiProperty()
  alternativeEmails: string;

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

  @Type(() => PrimarySurname)
  @IsDefined()
  @IsEnum(PrimarySurnameEnum)
  @ApiProperty({
    enum: {
      PrimarySurnameEnum,
    },
    enumName: 'primary attention',
    examples: [
      PrimarySurnameEnum.ma3ali,
      PrimarySurnameEnum.mr,
      PrimarySurnameEnum.sa3adt,
      PrimarySurnameEnum.yourExcelleny,
    ],
  })
  primarySurname: PrimarySurname;

  @IsDefined()
  @ApiProperty()
  @Validate(IsRef, ['surname'])
  secondarySurnameId: number[];

  @IsDefined()
  @ApiProperty()
  @Validate(IsRef, ['group'])
  groupId: number[];

  @IsDefined()
  @ApiProperty()
  @IsString()
  whatsappNumber: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  entity: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  position: string;

  @IsDefined()
  @ApiProperty()
  @IsBoolean()
  sendEmail: boolean;

  @IsDefined()
  @ApiProperty()
  @IsBoolean()
  sendWhatsapp: boolean;

  @IsDefined()
  @ApiProperty()
  @IsBoolean()
  attendConfirmation: boolean;
}

export class AttentionUpdateInputCentral extends BaseUpdateInput(
  AttentionCreateInputCentral,
) {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  serial: string;
}

class AttentionFilterInputCentral extends BaseFilterInput {
  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  fullName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  whatsappNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @FilterType('equals')
  attendConfirmation: boolean;
}

export class AttentionListInputCentral extends BaseListInput(
  ['attention'],
  AttentionFilterInputCentral,
) {}
