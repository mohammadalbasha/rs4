// import {
//   Body,
//   ClassSerializerInterceptor,
//   Controller,
//   Delete,
//   Get,
//   HttpStatus,
//   Param,
//   Patch,
//   Post,
//   Put,
//   Query,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { User } from '@prisma/client';
// import { plainToClass } from 'class-transformer';
// import { CurrentUser } from 'src/auth/auth-user/decorators/currentUser.decorator';
// import { UserTokenGuard } from 'src/auth/auth-user/guards/token.guard';

// import {
//   BaseApiErrorResponse,
//   BaseApiResponse,
//   SwaggerBaseApiResponse,
// } from '../../../shared/dtos/base-api-response.dto';
// import { PaginationParamsDto } from '../../../shared/dtos/pagination-params.dto';
// import { AppLogger } from '../../../shared/logger/logger.service';
// import { ReqContext } from '../../../shared/request-context/req-context.decorator';
// import { RequestContext } from '../../../shared/request-context/request-context.dto';
// import { UserOutput } from '../dtos/user-output.dto';
// import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
// import { UserListInput } from '../dtos/list.dto';
// import {
//   UpdateBillingEmail,
//   UpdateCustomerInput,
//   UpdateSellerCountryInput,
//   UpdateSellerCurrencyInput,
//   UpdateSellerInput,
//   UpdateSellerRequestInput,
//   UpdateSellerSpecialityInput,
//   UpdateUserInput,
// } from '../dtos/user-update-input.dto';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { UserServiceSeller } from './user.seller.service';
// import {
//   CreateCompanyInput,
//   UpdateCompanyInput,
//   UpdateCompanyRequestInput,
// } from '../dtos/company.dto';

// const tag = 'users';

// @ApiTags(tag)
// @UseGuards(UserTokenGuard)
// @Controller(tag)
// export class UserControllerSeller extends BaseCRUDController(
//   'users',
//   'user',
//   UserListInput,
//   UpdateUserInput,
//   UpdateUserInput,
//   {
//     hasDelete: false,
//     hasCreate: false,
//   },
// ) {
//   constructor(
//     private prismaService: PrismaService,
//     private userService: UserServiceSeller,
//   ) {
//     super(prismaService);
//   }

//   @ApiBearerAuth()
//   @UseInterceptors(ClassSerializerInterceptor)
//   @Get('me')
//   @ApiOperation({
//     summary: 'Get user me API',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     type: SwaggerBaseApiResponse(UserOutput),
//   })
//   @ApiResponse({
//     status: HttpStatus.UNAUTHORIZED,
//     type: BaseApiErrorResponse,
//   })
//   async getMyProfile(
//     @ReqContext() ctx: RequestContext,
//     @CurrentUser() user: User,
//   ): Promise<BaseApiResponse<UserOutput>> {
//     //    const user = await this.userService.findById(ctx, ctx.user.id);
//     return {
//       data: user, // plainToClass(UserOutput, user, { excludeExtraneousValues: true }),
//       meta: {},
//     };
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('')
//   @ApiOperation({
//     summary: 'update seller',
//   })
//   async updateSeller(
//     @Body() data: UpdateSellerInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateSeller(data, user);
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('/bilingEmail')
//   @ApiOperation({
//     summary: 'update seller billing email',
//   })
//   async updateSellerBillingEmail(
//     @Body() data: UpdateBillingEmail,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateBillingEmail(data, user);
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('/update-country')
//   @ApiOperation({
//     summary: 'update seller country',
//   })
//   async updateSellerCountry(
//     @Body() data: UpdateSellerCountryInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateSellerCountry(data, user);
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('/update-currency')
//   @ApiOperation({
//     summary: 'update seller currency',
//   })
//   async updateSellerCurrency(
//     @Body() data: UpdateSellerCurrencyInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateSellerCurrency(data, user);
//   }

//   @UseInterceptors(ClassSerializerInterceptor)
//   @Put('/update-speciality')
//   @ApiOperation({
//     summary: 'update seller speciality',
//   })
//   async updateSellerSpeciality(
//     @Body() data: UpdateSellerSpecialityInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateSellerSpeciality(data, user);
//   }

//   @ApiOperation({
//     summary: 'update seller request',
//   })
//   @UseInterceptors(ClassSerializerInterceptor)
//   @Post('update-seller-request')
//   async updateRequest(
//     @Body() data: UpdateSellerRequestInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateSellerRequest(user, data);
//   }

//   @ApiOperation({
//     summary: 'update company request',
//   })
//   @UseInterceptors(ClassSerializerInterceptor)
//   @Post('update-company-request')
//   async updateCompanyRequest(
//     @Body() data: UpdateCompanyRequestInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateCompanyRequest(user, data);
//   }

//   @ApiOperation({
//     summary: 'create company ',
//   })
//   @Post('companies')
//   async createCompany(
//     @Body() data: CreateCompanyInput,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.createCompany(user, data);
//   }

//   @ApiOperation({
//     summary: 'update company ',
//   })
//   @Put('companies/:id')
//   async updateCompany(
//     @Body() data: UpdateCompanyInput,
//     @Param('id') id: number,
//     @CurrentUser() user: User,
//   ) {
//     return this.userService.updateCompany(user, id, data);
//   }

//   @ApiOperation({
//     summary: 'delete company ',
//   })
//   @Delete('companies/:id')
//   async deleteCompany(@Param('id') id: number, @CurrentUser() user: User) {
//     return this.userService.deleteCompany(user, id);
//   }
//   @ApiOperation({
//     summary: 'list companies ',
//   })
//   @Get('companies')
//   async listCompany(@CurrentUser() user: User) {
//     return this.userService.listCompanies(user);
//   }
// }
