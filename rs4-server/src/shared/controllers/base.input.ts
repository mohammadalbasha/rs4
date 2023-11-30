import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type as ClassTransformerType } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationParamsDto } from '../dtos/pagination-params.dto';
import { PrismaModels } from '../prisma/prismaModels.type';

export function BaseCreateInput(Model: PrismaModels) {
  class BaseCreateInput {
    // @IsDefined()
    // @IsNotEmpty()
    // @IsString()
    // id: string;
  }
  return BaseCreateInput;
}

export function BaseUpdateInput(CreateInput) {
  class BaseUpdateInput extends PartialType(CreateInput) {
    // @IsDefined()
    // @IsNotEmpty()
    // @IsString()
    // id: string;
  }
  return BaseUpdateInput;
}

export class BaseFilterInput {
  query?: string;
}

class BaseOrderInputClass {
  field: string;
  direction: string;
}

export function BaseOrderInputInArray(isIn: Array<string>) {
  class BaseOrderInput {
    @ApiPropertyOptional()
    @IsDefined()
    @IsIn(['id', 'createdAt', 'updatedAt', ...isIn])
    field: string = 'id';

    @ApiPropertyOptional()
    @IsDefined()
    @IsIn(['asc', 'desc'])
    direction: string = 'desc';
  }
  return BaseOrderInput;
}

export class BaseListInputClass {
  filter: {};
  order: BaseOrderInputClass;
  pagination: PaginationParamsDto;
}
export function BaseListInput<FilterDTO>(
  orderFields: Array<string>,
  FilterDTO: Type<FilterDTO>,
) {
  class OrderInput extends BaseOrderInputInArray(orderFields) {}

  class BaseListInput {
    @ApiProperty({ type: () => FilterDTO })
    @ValidateNested()
    @ClassTransformerType(() => FilterDTO)
    filter: FilterDTO;

    @ApiProperty({ type: OrderInput })
    @ValidateNested()
    @ClassTransformerType(() => OrderInput)
    order: OrderInput;

    @ApiProperty({ type: PaginationParamsDto })
    @ValidateNested()
    @ClassTransformerType(() => PaginationParamsDto)
    pagination: PaginationParamsDto;
  }

  return BaseListInput;
}

// export function BaseLocaleFieldInput<LocaleInput> (LocaleInput: Type<LocaleInput>) {
//   class BaseHasLocaleInput {
//     @ClassTransformerType(() => LocaleInput)
//     @ValidateNested({ each: true })
//     @ArrayMinSize(1)
//     @ArrayUnique((o) => o.locale)

//     locales?: Array<LocaleInput>;
//   }

//   return BaseHasLocaleInput;
// }

// @InputType()
// export class BaseLocaleItemInput {
//   @IsIn(Object.keys(langObject))
//   @IsNotEmpty()
//   @Field(() => String, {nullable:false})
//   locale: string;
// }

export class BaseInput {}
