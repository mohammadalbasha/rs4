import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaModels } from '../prisma/prismaModels.type';

export const CurrentModel = createParamDecorator(
  (modeName: PrismaModels, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const model = request[modeName];

    return model;
  },
);
