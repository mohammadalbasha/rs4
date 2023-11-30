// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Gender, Locale } from '@prisma/client';
// import { Type } from 'class-transformer';
// import {
//   IsBoolean,
//   IsDefined,
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsString,
//   Length,
//   MaxLength,
//   Validate,
//   ValidateNested,
// } from 'class-validator';
// import { CompanyInput } from 'src/auth/auth-central/dtos/manageUserByCentral.dto';
// import { IsRef } from 'src/shared/decorators/validation/isRef.validator';
// import { UniqueValidator } from 'src/shared/decorators/validation/unique.input.decorator';

// export class UpdateUserInput {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @MaxLength(100)
//   @IsString()
//   name: string;
// }

// export class UpdateSellerCountryInput {
//   @Validate(IsRef, ['country'])
//   @ApiProperty()
//   @IsNumber()
//   countryId?: number;
// }
// export class UpdateSellerCurrencyInput {
//   @Validate(IsRef, ['currency'])
//   @ApiProperty()
//   @IsNumber()
//   currencyId?: number;
// }

// export class UpdateSellerSpecialityInput {
//   @Validate(IsRef, ['speciality'])
//   @ApiProperty()
//   @IsNumber()
//   specialityId?: number;
// }

// export class UpdateSellerInput {
//   @Validate(UniqueValidator, ['user', 'email'])
//   @IsEmail()
//   @ApiPropertyOptional()
//   @IsOptional()
//   email: string;

//   //@Type(() => LocaleField)
//   //@ValidateNested()
//   @IsEnum(Locale)
//   @ApiPropertyOptional()
//   @IsOptional()
//   locale: Locale;

//   @IsEnum(Gender)
//   @ApiPropertyOptional()
//   @IsOptional()
//   gender?: Gender;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @Validate(IsRef, ['mediaFile'])
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNumber()
//   imageId?: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   city?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   postalCode?: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   address?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   region: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   street: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   website?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   facebookAccount?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   twitterAccount?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   linkedinAccount?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsOptional()
//   buildingNumber?: number;
// }

// export class UpdateBillingEmail {
//   @ApiProperty()
//   @IsEmail()
//   @IsDefined()
//   bilingEmail?: string;
// }

// export class UpdateCustomerInput {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @MaxLength(100)
//   @IsString()
//   name: string;

//   @ApiPropertyOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   dateOfBirth?: Date;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @Validate(IsRef, ['mediaFile'])
//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNumber()
//   imageId?: number;
// }

// // export class UpdateSellerRequestInput{
// //   @ApiPropertyOptional()
// //   @IsOptional()
// //   @IsNotEmpty()
// //   @IsString()
// //   name: string;

// //   @Validate(UniqueValidator, ['user', 'email'])
// //   @IsEmail()
// //   @ApiPropertyOptional()
// //   @IsOptional()
// //   email: string;

// //     //@Validate(UniqueSSN, [User, 'socialSecurityNumber'])

// //   @ApiPropertyOptional()
// //   @IsOptional()
// //   @IsNotEmpty()
// //   @IsString()
// //   socialSecurityNumber?: string;

// //   @ApiPropertyOptional()
// //   @IsOptional()
// //   @IsNotEmpty()
// //   @IsString()
// //   dateOfBirth?: Date;

// //   /* mohammad albacha */
// //   @ApiPropertyOptional()
// //   @IsOptional()
// //   @IsBoolean()
// //   isCompanyAccount: boolean;

// //   @IsOptional()
// //   @Type(() => CompanyInput)
// //   @ValidateNested()
// //   @ApiProperty()
// //   company?: CompanyInput;

// // }

// export enum UpdateSellerFields {
//   dateOfBirth = 'dateOfBirth',
//   isCompanyAccount = 'isCompanyAccount',
//   socialSecurityNumber = 'socialSecurityNumber',
//   name = 'name',
// }

// export class UpdateSellerRequestInput {
//   @IsString()
//   @IsDefined()
//   @IsEnum(UpdateSellerFields)
//   @ApiProperty({
//     enum: UpdateSellerFields,
//     enumName: ' Update SELLER input',
//     isArray: true,
//     example: [
//       UpdateSellerFields.dateOfBirth,
//       UpdateSellerFields.isCompanyAccount,
//       UpdateSellerFields.name,
//       UpdateSellerFields.socialSecurityNumber,
//     ],
//   })
//   fieldName: string;

//   @ApiProperty()
//   @IsDefined()
//   value: any;
// }
