import { PureAbility } from '@casl/ability';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAbility = createParamDecorator<PureAbility>(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    /* mohammad albacha*/
    /* here the ability gets from the context, it was added in the GQL_auth_guard*/
    return req.ability;
  }
);

