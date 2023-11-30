import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JWT } from 'src/shared/configs/config.interfaces';
import { CentralAuthService } from '../services/centralAuth.service';
import { JwtDto } from '../dtos/jwt.dto';
import { CentralUser } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: CentralAuthService,
    readonly configService: ConfigService<JWT>,
  ) {
    /* mohammad albacha */
    /* look to this line , impoooortant */
    /* I must call the super function */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  /* mohammad albacha */
  /* authentication applied by passportJs */
  /* we validate user using our auth service to access database */
  /*  really I don't know how to this straegy are called*/
  async validate(request: Request, payload: JwtDto): Promise<CentralUser> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
