import * as path from 'path';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
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
import { DevicesModule } from './modules/devices/devices.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

import { ProductsModule } from './modules/products/products.module';
import { Device } from './modules/devices/entities/device.entity';
import { User } from './modules/users/entities/user.entity';
import { Transaction } from './modules/transactions/entities/transaction.entity';
import { Product } from './modules/products/entities/product.entity';

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
        entities: [Device, User, Transaction, Product],
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    DevicesModule,
    TransactionsModule,

    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
