import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  BaseFilterInput,
  BaseListInput,
} from 'src/shared/controllers/base.input';
import { FilterType } from 'src/shared/decorators/filterType.decorator';

export class AdministratorFilterInput extends BaseFilterInput {
  // @Validate(IsRef, [User])
  // id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('equals')
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('equals')
  isDeleted?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  phoneNumber?: string;

  // TODO:
  // @Validate(IsRef, [Country])
  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('equals')
  countryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('contains')
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('default')
  roles: number;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('default')
  createdAtFrom: string;

  @ApiPropertyOptional()
  @IsOptional()
  @FilterType('default')
  createdAtTo: string;
}

export class AdministratorListInput extends BaseListInput(
  [],
  AdministratorFilterInput,
) {}
