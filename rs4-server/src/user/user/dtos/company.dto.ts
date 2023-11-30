// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import {
//   Validate,
//   IsNotEmpty,
//   IsString,
//   IsOptional,
//   IsNumber,
//   IsDefined,
//   IsEnum,
// } from 'class-validator';
// import { UniqueMultiFields } from 'src/auth/auth-central/decorators/validation/unique-companyName.validator';
// import { IsRef } from 'src/shared/decorators/validation/isRef.validator';

// export enum UpdateCompanyFields {
//   dateOfEstablishment = 'dateOfEstablishment',
//   countryId = 'countryId',
//   businessTypeId = 'businessTypeId',
//   legalName = 'legalName',
// }

// export class UpdateCompanyInput {
//   @ApiPropertyOptional()
//   @IsNotEmpty()
//   @IsOptional()
//   @IsString()
//   phoneNumber: string;

//   @ApiPropertyOptional()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   city: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   region: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   street: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   buildingNumber?: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   officeNumber?: number;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @ApiPropertyOptional()
//   @IsOptional()
//   postalCode?: number;
// }

// export class UpdateCompanyRequestInput {
//   @IsString()
//   @IsDefined()
//   @IsEnum(UpdateCompanyFields)
//   @ApiProperty({
//     enum: UpdateCompanyFields,
//     enumName: ' Update company input',
//     isArray: true,
//     example: [
//       UpdateCompanyFields.businessTypeId,
//       UpdateCompanyFields.countryId,
//       UpdateCompanyFields.dateOfEstablishment,
//       UpdateCompanyFields.legalName,
//     ],
//   })
//   fieldName: string;

//   @ApiProperty()
//   @IsDefined()
//   value: any;

//   @ApiProperty()
//   @Validate(IsRef, ['company'])
//   @IsDefined()
//   @IsNumber()
//   companyId: number;
// }

// export class CreateCompanyInput {
//   @Validate(UniqueMultiFields, ['company', 'legalName', 'countryId'])
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   legalName: string;

//   //
//   // @ApiProperty()
//   // @IsNotEmpty()
//   // @IsString()
//   // @IsOptional()
//   // businessType: string;

//   @ApiProperty()
//   @IsOptional()
//   dateOfEstablishment: Date;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsOptional()
//   @IsString()
//   phoneNumber: string;

//   @Validate(IsRef, ['country'])
//   @ApiProperty()
//   @IsNumber()
//   countryId?: number; // if no country id then didn't init

//   @Validate(IsRef, ['businessType'])
//   @ApiProperty()
//   @IsNumber()
//   businessTypeId?: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   city: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   region: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   street: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   buildingNumber?: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsOptional()
//   officeNumber?: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsOptional()
//   postalCode?: number;
// }
