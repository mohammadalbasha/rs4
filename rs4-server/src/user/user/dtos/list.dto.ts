// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
// import {
//   BaseFilterInput,
//   BaseListInput,
// } from 'src/shared/controllers/base.input';
// import { FilterType } from 'src/shared/decorators/filterType.decorator';

// class UserFilterInput extends BaseFilterInput {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('contains')
//   @IsString()
//   name: string;

//   @ApiPropertyOptional()
//   @IsEmail()
//   @IsOptional()
//   @FilterType('contains')
//   email: string;

//   @ApiPropertyOptional()
//   @IsEmail()
//   @IsOptional()
//   @FilterType('contains')
//   ssn: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('contains')
//   @IsString()
//   phoneNumber: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('equals')
//   isDeleted: boolean;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('equals')
//   isSoftDeleted: boolean;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('equals')
//   isActive: boolean;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('equals')
//   isCompanyAccount: boolean;
// }
// export class UserListInput extends BaseListInput(['name'], UserFilterInput) {}
