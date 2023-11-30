import { BadRequestException } from '@nestjs/common';
import { CentralUserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
import { ApiController } from 'src/shared/decorators/apiController.decorator';

import {
  CentralUserCreateInputCentral,
  CentralUserListInputCentral,
  CentralUserUpdateInputCentral,
} from './admin.input.central';
import { CentralUser } from '@prisma/client';
import { PasswordService } from 'src/auth/auth-central/services/password.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@CentralUserAuthorized()
@ApiController('centralUsers', 1)
export class CentralUserControllerCentral extends BaseCRUDController(
  'centralUsers',
  'centralUser',
  CentralUserListInputCentral,
  CentralUserCreateInputCentral,
  CentralUserUpdateInputCentral,
  {
    hasDeleteMany: true,
  },
) {
  constructor(
    private passwordService: PasswordService,
    public prisma: PrismaService,
  ) {
    super(prisma);
  }

  public RelationFields = ['permisions'] as any;

  public async createData(
    data: CentralUserCreateInputCentral,
    user: CentralUser,
  ) {
    delete data.confirmPass;
    data.password = await this.passwordService.hashPassword(data.password);
    return {
      ...data,
    };
  }

  public async updateData(data: any, user: CentralUser) {
    if (data.password) {
      if (data.password != data.confirmPass) {
        throw new BadRequestException('passwords must match');
      }
      delete data.confirmPass;
      data.password = await this.passwordService.hashPassword(data.password);
    }

    return {
      ...data,
    };
  }

  // public updateData(data: CentralUserUpdateInputCentral, user: User): any {
  //   // @ts-ignore
  //   return data.countries
  //     ? {
  //         ...data,
  //         countries: {
  //           // @ts-ignore
  //           set: data.countries.map((countryId) => {
  //             return { id: countryId };
  //           }),
  //         },
  //       }
  //     : data;
  // }
  // // check if you can add or filter || allcountries
  // public whereData(filterBy, user: User): any {
  //   return {
  //     ...filterBy,
  //     ...(filterBy.countries && {
  //       countries: {
  //         every: {
  //           id: parseInt(filterBy.countries),
  //         },
  //       },
  //     }),
  //     //isActive: true,
  //   };
  // }
  // // TODO:
  // // canUpdate
  // // canDelete
  // public async canDelete(item: any, user: User): Promise<boolean> {
  //   // list all documents with centralUserId equal to this record
  //   // if found throw exception
  //   const document = await this.prisma.document.findFirst({
  //     where: {
  //       centralUserId: item.id,
  //     },
  //   });
  //   if (document)
  //     throw new BadRequestException(
  //       'centralUser has relationships with documents',
  //     );
  //   return true;
  // }
  // public async canUpdate(item: any, data: any, user: User): Promise<boolean> {
  //   // if change country
  //   // list all documents with centralUserId equal to this record
  //   // list all users where document.userId = user.id & countryId = user.countryId
  //   // if found throw exception
  //   if (data.countries)
  //     for (const country of item.countries) {
  //       const id = country.id;
  //       if (!data.countries.includes(id)) {
  //         const users = await this.prisma.user.findMany({
  //           where: {
  //             countryId: id,
  //           },
  //         });
  //         for (const user of users) {
  //           const document = await this.prisma.document.findFirst({
  //             where: {
  //               userId: user.id,
  //               centralUserId: item.id,
  //             },
  //           });
  //           if (document)
  //             throw new BadRequestException(
  //               'related documents assigned to users from countries you want to delete',
  //             );
  //         }
  //       }
  //     }
  //   // throw new BadRequestException('centralUser has relationships');
  //   return true;
  // }
}
