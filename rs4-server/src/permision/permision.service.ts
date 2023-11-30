import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateCentralPermisions } from './permisions.input';

@Injectable()
export class CentralPermisionService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.permision.findMany();
  }

  updateCentralPermisions(data: UpdateCentralPermisions) {
    return this.prisma.centralUser.update({
      where: { id: data.centralId },
      data: {
        permisions: {
          // @ts-ignore
          set: data.permisions.map((permision) => {
            return { id: permision };
          }),
        },
      },
    });
  }
}
