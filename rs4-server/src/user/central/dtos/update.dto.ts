import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, Validate } from 'class-validator';
import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
import { UniqueValidator } from 'src/shared/decorators/validation/unique.input.decorator';

export class UpdateAdministratorInput {
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @Validate(UniqueValidator, ['centralUser', 'email'])
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;
}
