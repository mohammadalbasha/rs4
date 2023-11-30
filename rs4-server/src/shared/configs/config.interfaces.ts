export interface NodeConfig {
  APP_ENV: string;
  APP_PORT: number;
}

export interface BcryptConfig {
  SALT: string;
}

export interface DatabaseConfig {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  DATABASE_URL: string;
}

export interface MailConfig {
  MAIL_HOST: string;
  MAIL_PORT: string;
  MAIL_IS_SECURE: boolean;
  MAIL_DEFAULT_FROM_USER: string;
  MAIL_AUTH_USER: string;
  MAIL_AUTH_PASSWORD: string;
  MAIL_SMTP: string;

  ZOHO_HOST: string;
  ZOHO_PORT: string;
  ZOHO_IS_SECURE: boolean;
  ZOHO_DEFAULT_FROM_USER: string;
  ZOHO_AUTH_USER: string;
  ZOHO_AUTH_PASSWORD: string;
}

export interface FrontendLinksConfig {
  CONFIRM_ATTENTION: string;
}

export interface JWT {
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_TOKEN_EXP_IN_SEC: string;
  JWT_REFRESH_TOKEN_EXP_IN_SEC: string;
}
