import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CentralUser } from '@prisma/client';

export const CurrentUser = createParamDecorator< CentralUser>(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
