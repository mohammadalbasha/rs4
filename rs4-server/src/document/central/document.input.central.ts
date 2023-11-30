// import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
// import { Prisma } from '@prisma/client';
// import { Transform, Type } from 'class-transformer';
// import {
//   ArrayUnique,
//   IsArray,
//   IsBoolean,
//   IsDefined,
//   IsEnum,
//   IsIn,
//   IsInt,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsString,
//   Length,
//   Max,
//   MaxLength,
//   Min,
//   MinLength,
//   Validate,
//   ValidateNested,
// } from 'class-validator';
// import {
//   BaseCreateInput,
//   BaseFilterInput,
//   BaseListInput,
//   BaseOrderInputInArray,
//   BaseUpdateInput,
// } from 'src/shared/controllers/base.input';
// import { FilterType } from 'src/shared/decorators/filterType.decorator';
// import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
// import {
//   IsUnique,
//   UniqueValidator,
// } from 'src/shared/decorators/validation/unique.input.decorator';
// import { LocaleField } from 'src/shared/dtos/localeField.dts';

// export enum DocumentStatus {
//   new = 'new',
//   inprocessing = 'inprocessing',
//   accepted = 'accepted',
//   rejected = 'rejected',
// }

// export enum UserType {
//   seller = 'seller',
//   customer = 'customer',
// }

// export class DocumentCreateInputCentral extends BaseCreateInput(
//   'documentType',
// ) {
//   @ApiProperty()
//   @Validate(IsRef, ['documentType'])
//   documentTypeId: number;

//   @ApiProperty({
//     type: Number,
//     minimum: 1,
//   })
//   @Validate(IsRef, ['user'])
//   userId: number;

//   @ApiProperty()
//   @IsDefined()
//   @IsEnum(UserType)
//   userType: UserType;

//   @IsOptional()
//   @IsString()
//   @ApiPropertyOptional()
//   centralNotes?: string;

//   @IsOptional()
//   @ApiPropertyOptional()
//   @IsBoolean()
//   isActive: boolean;
// }

// export class DocumentUpdateInputCentral extends BaseUpdateInput(
//   DocumentCreateInputCentral,
// ) {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsEnum(DocumentStatus)
//   status: DocumentStatus;

//   // fileId
// }

// class DocumentFilterInputCentral extends BaseFilterInput {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('default')
//   userId: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @FilterType('default')
//   documentTypeId: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsEnum(UserType)
//   @FilterType('equals')
//   userType: UserType;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsBoolean()
//   @FilterType('equals')
//   isActive: boolean;
// }
// export class DocumentListInputCentral extends BaseListInput(
//   ['documentTypeId'],
//   DocumentFilterInputCentral,
// ) {}
