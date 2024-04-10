import {
  ValidationPipe,
  VersioningType,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { useContainer } from 'class-validator';
import { AllConfigType } from './config/config.type';
import validationOptions from './utils/validation-options';

//------------------------------------------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<AllConfigType>);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // utils
  if (
    configService.getOrThrow('app.nodeEnv', { infer: true }) === 'production'
  ) {
    app.use(compression());
  }

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Supply Sphere API')
    .setDescription('Supply Sphere API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey()
    .addOAuth2()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Docs | Supply Sphere',
    // customfavIcon: '/favicon/favicon.ico',
  });

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

bootstrap();
