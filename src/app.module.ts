import * as path from 'path';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
// ----------------------------------------------------------

import { AppService } from './app.service';
import { AppController } from './app.controller';
// ----------------------------------------------------------

import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import googleConfig from './config/google.config';
import databaseConfig from './config/database.config';
// ----------------------------------------------------------

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicesModule } from './modules/services/services.module';
import { SupplyChainModule } from './modules/supply-chain/supply-chain.module';
import { RawMaterialsModule } from './modules/raw-materials/raw-materials.module';

// ----------------------------------------------------------

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'public'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        mailConfig,
        fileConfig,
        googleConfig,
        databaseConfig,
      ],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('database.type'),
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        synchronize: config.get<boolean>('database.synchronize'),
        autoLoadEntities: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
    }),
    AuthModule,
    UsersModule,
    UploadModule,
    OrdersModule,
    InvoiceModule,
    ProductsModule,
    ServicesModule,
    SupplyChainModule,
    RawMaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
