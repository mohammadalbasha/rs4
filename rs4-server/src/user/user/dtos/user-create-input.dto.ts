// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import {
//   ArrayNotEmpty,
//   IsAlphanumeric,
//   IsArray,
//   IsBoolean,
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Length,
//   MaxLength,
// } from 'class-validator';

// import { ROLE } from '../../../auth/auth-user/constants/role.constant';

// export class CreateUserInput {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   @Length(6, 100)
//   password: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsEmail()
//   @MaxLength(100)
//   email: string;
// }
