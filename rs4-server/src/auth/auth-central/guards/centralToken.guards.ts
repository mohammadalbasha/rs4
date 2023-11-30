import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Injectable,
  Inject,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';

import { CaslAbilityFactory } from 'src/authorization/casl/casl-ability.factory';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/authorization/casl/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    // private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    super();
  }

  // get user even if it's a public link
  handleRequest(err, user, info, context: ExecutionContext) {
    /*mohammad albacha*/

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();

    if (user) {
      req.ability = this.caslAbilityFactory.createForCentralUser(user);
      return user;
    } else {
      req.ability = this.caslAbilityFactory.createForGuest();
      if (isPublic) return null; // the user return
      throw new UnauthorizedException();
    }
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
