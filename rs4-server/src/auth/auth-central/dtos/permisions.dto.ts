import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsNumber, IsDefined, Validate } from 'class-validator';

export class UpdateCentralUserPermisions {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Validate(IsRef, ['centralUser'])
  userId: number;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @Validate(IsRef, ['permision'])
  permisions: number[];
}
