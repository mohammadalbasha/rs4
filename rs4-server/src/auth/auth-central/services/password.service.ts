import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { BcryptConfig } from 'src/shared/configs/config.interfaces';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService<BcryptConfig>) {}

  get bcryptSaltRounds(): string | number {
    const bcryptSaltOrRount = this.configService.get('SALT');

    return Number.isInteger(Number(bcryptSaltOrRount))
      ? Number(bcryptSaltOrRount)
      : bcryptSaltOrRount;
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
}
