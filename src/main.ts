require('module-alias/register');

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Nestogram_api_v2')
    .setDescription('The Nestogram API v2')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const port: string | number =
    (configService.get('PORT') as string) || process.env.PORT || 3000;
  console.log('port', port);
  await app.listen(port);
}
bootstrap();
