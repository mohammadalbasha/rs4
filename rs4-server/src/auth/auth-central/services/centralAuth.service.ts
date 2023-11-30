import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CentralUser, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { PasswordService } from './password.service';
import { FrontendLinksConfig, JWT } from 'src/shared/configs/config.interfaces';
import { CaslAbilityFactory } from 'src/authorization/casl/casl-ability.factory';
import { JwtDto } from '../dtos/jwt.dto';
import { CreateCentralInput } from '../dtos/manageAdministrator.dto';
import { LoginInput } from '../dtos/login.dto';
import { UpdateCentralPermisions } from 'src/permision/permisions.input';
import { UpdateCentralUserPermisions } from '../dtos/permisions.dto';

@Injectable()
export class CentralAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<JWT>,
    private readonly passwordService: PasswordService,
    private authorizationService: CaslAbilityFactory,
  ) {}

  async createAdministratorBySuperAdmin(data: CreateCentralInput) {
    delete data.confirmPass;
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    const user = await this.prismaService.centralUser.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    delete data.password;
    return user;
  }

  async login(credential: LoginInput) {
    const user = await this.prismaService.centralUser.findUnique({
      where: { email: credential.email },
      include: {
        permisions: true,
      },
    });
    if (!user) throw new UnauthorizedException('credentials are invalid');

    const ability = await this.authorizationService.createForCentralUser(user);
    const tokens = this.generateTokens(user.id);

    delete user.password;

    return {
      tokens,
      user,
      ability: ability?.rules,
    };
  }

  async me(user: CentralUser) {
    const ability = await this.authorizationService.createForCentralUser(user);
    return {
      ability: ability.rules,
      user,
    };
  }

  generateTokens(userId: number) {
    return {
      accessToken: this.generateAccessToken(userId),
      refreshToken: this.generateRefreshToken(userId),
    };
  }

  private generateAccessToken(userId: any): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXP_IN_SEC'),
      },
    );
  }

  private generateRefreshToken(userId: any): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP_IN_SEC'),
      },
    );
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens(userId);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateUser(payload: JwtDto): Promise<CentralUser> {
    return this.prismaService.centralUser.findUnique({
      where: { id: payload.userId },
      include: {
        permisions: true,
      },
    });
  }

  listAllPermisions() {
    return this.prismaService.permision.findMany();
  }

  updateCentralPermisions(data: UpdateCentralUserPermisions) {
    return this.prismaService.centralUser.update({
      where: { id: data.userId },
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
