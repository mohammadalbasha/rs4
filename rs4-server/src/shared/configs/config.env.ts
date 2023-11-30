import { resolve } from 'path';

import envFilePath from './config.helper';
import { FrontendLinksConfig, JWT } from './config.interfaces';

envFilePath(resolve(process.cwd(), '.env'));

export function nodeConfig() {
  return {
    APP_ENV: process.env.APP_ENV,
    APP_PORT: parseInt(<string>process.env.APP_PORT, 10),
  };
}

export function bcryptConfig() {
  return {
    SALT: parseInt(<string>process.env.HASH_SALT, 10),
  };
}

export function dbConfig() {
  return {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
  };
}

export function frontendLinksConfig(): FrontendLinksConfig {
  return {
    CONFIRM_ATTENTION: process.env.FRONTEND_CONFIRM_ATTENTION,
  };
}

export function mailConfig() {
  return {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    DEFAULT_FROM_USER: process.env.MAIL_DEFAULT_FROM_USER,
    IS_SECURE: Boolean(process.env.MAIL_IS_SECURE),
    AUTH_USER: process.env.MAIL_AUTH_USER,
    AUTH_PASSWORD: process.env.MAIL_AUTH_PASSWORD.toString(),
    MAIL_SMTP: process.env.MAIL_SMTP.toString(),

    ZOHO_HOST: process.env.ZOHO_MAIL_HOST,
    ZOHO_PORT: process.env.ZOHO_MAIL_PORT,
    ZOHO_IS_SECURE: Boolean(process.env.ZOHO_MAIL_IS_SECURE),
    ZOHO_DEFAULT_FROM_USER: process.env.ZOHO_MAIL_DEFAULT_FROM_USER,
    ZOHO_AUTH_USER: process.env.ZOHO_MAIL_AUTH_USER,
    ZOHO_AUTH_PASSWORD: process.env.ZOHO_MAIL_AUTH_PASSWORD.toString(),
  };
}

export function jwtConfig(): JWT {
  return {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_TOKEN_EXP_IN_SEC: process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_TOKEN_EXP_IN_SEC: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
  };
}
