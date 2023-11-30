import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 25',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit = 25;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}

export class OrderParamDto {
  @ApiPropertyOptional()
  @IsString()
  @IsDefined()
  field = 'id';

  @ApiPropertyOptional()
  @IsDefined()
  @IsIn(['asc', 'desc'])
  direction = 'desc';
}
