import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}

