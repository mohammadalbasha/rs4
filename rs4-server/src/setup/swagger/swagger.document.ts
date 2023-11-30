import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CentralModule } from 'src/routes/central.module';
import { CustomerModule } from 'src/routes/customer.module';

export class SwaggerDocuments {
  static centralSwaggerDocument(app: INestApplication) {
    return SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Sadeed Platform APIs (Central section)')
        .setDescription(
          'APIs that Central-users and sub-admins can consume it and fetch data from it',
        )
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .setVersion('1.0')
        .build(),
      {
        include: [CentralModule],
      },
    );
  }
}
