import * as path from 'path';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import mailConfig from './config/mail.config';
import googleConfig from './config/google.config';
import databaseConfig from './config/database.config';

// ----------------------------------------------------------

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, mailConfig, googleConfig, databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
    }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService) => ({
    //     uri: config.getOrThrow<string>('database.url'),
    //     useNewUrlParser: true,
    //     useFindAndModify: false,
    //   }),
    // }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
