import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsRef } from 'src/shared/decorators/validation/isRef.validator';


export class UpdateCentralRoleInput {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  description: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name: string;

  
}

export class UpdateCentralPermisions {
  @Validate(IsRef, ['centralUser'])
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  centralId: number;

  @Validate(IsRef, [
    'permision',
    {
      type: 'CENTRAL',
    },
  ])
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  permisions: number[];
}
