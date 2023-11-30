import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsModule } from 'nestjs-cls';
import { HeaderResolver, I18nLoader, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import {
  bcryptConfig,
  dbConfig,
  frontendLinksConfig,
  jwtConfig,
  mailConfig,
  nodeConfig,
} from 'src/shared/configs/config.env';

import { MatchPassword } from './auth/auth-central/decorators/validation/matchPassword.decorator';
import { IsRef } from './shared/decorators/validation/isRef.validator';
import { UniqueValidator } from './shared/decorators/validation/unique.input.decorator';
import { SharedModule } from './shared/shared.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { CentralModule } from './routes/central.module';

import { NodeConfig } from './shared/configs/config.interfaces';
import { Environment } from './shared/constants/environments';
import {
  I18nAbstractLoader,
  I18nAbstractLoaderOptions,
} from 'nestjs-i18n/dist/loaders/i18n.abstract.loader';

@Module({
  imports: [
    SharedModule,

    CentralModule,

    RouterModule.register([
      {
        path: 'central',
        module: CentralModule,
      },
    ]),

    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('req', req);
        },
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
      isGlobal: true,
      load: [
        bcryptConfig,
        mailConfig,
        nodeConfig,
        dbConfig,
        frontendLinksConfig,
        jwtConfig
     
      ],
    }),
    EventEmitterModule.forRoot({ global: true }),
    I18nModule.forRootAsync({
      resolvers: [new HeaderResolver(['lang'])],
      useFactory: (nodeConfig: ConfigService<NodeConfig>) => ({
        fallbackLanguage: 'en',
        loaderOptions: <I18nAbstractLoaderOptions>{
          path: join(__dirname, '/shared/i18n/'),
          watch: true,
          includeSubfolders: true,
        },
        typesOutputPath: join(
          __dirname,
          '../src/shared/i18n/i18n.generated.ts',
        ),
        logging: nodeConfig.get('APP_ENV') === Environment.Development,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    UniqueValidator,
    IsRef,
    MatchPassword,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
