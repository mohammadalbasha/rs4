import { BadRequestException } from '@nestjs/common';
import { CentralUserAuthorized } from 'src/authorization/casl/decorator/authorize.decorator';
import BaseCRUDController from 'src/shared/controllers/baseCRUD.controller';
import { ApiController } from 'src/shared/decorators/apiController.decorator';

import {
  GroupCreateInputCentral,
  GroupListInputCentral,
  GroupUpdateInputCentral,
} from './group.input.central';

@CentralUserAuthorized()
@ApiController('groups', 1)
export class GroupControllerCentral extends BaseCRUDController(
  'groups',
  'group',
  GroupListInputCentral,
  GroupCreateInputCentral,
  GroupUpdateInputCentral,
) {
  // public createData(data: GroupCreateInputCentral, user: User): any {
  //   return {
  //     ...data,
  //     countries: {
  //       connect: data.countries.map((countryId) => {
  //         return { id: countryId };
  //       }),
  //     },
  //   };
  // }
  // public updateData(data: GroupUpdateInputCentral, user: User): any {
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
  //   // list all documents with groupId equal to this record
  //   // if found throw exception
  //   const document = await this.prisma.document.findFirst({
  //     where: {
  //       groupId: item.id,
  //     },
  //   });
  //   if (document)
  //     throw new BadRequestException(
  //       'group has relationships with documents',
  //     );
  //   return true;
  // }
  // public async canUpdate(item: any, data: any, user: User): Promise<boolean> {
  //   // if change country
  //   // list all documents with groupId equal to this record
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
  //               groupId: item.id,
  //             },
  //           });
  //           if (document)
  //             throw new BadRequestException(
  //               'related documents assigned to users from countries you want to delete',
  //             );
  //         }
  //       }
  //     }
  //   // throw new BadRequestException('group has relationships');
  //   return true;
  // }
}
