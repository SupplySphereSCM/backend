import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: JwtStrategy,
      useFactory: (config: ConfigService, userService: UsersService) => {
        return new JwtStrategy(
          config.getOrThrow<string>('auth.secret'),
          userService,
        );
      },
      inject: [ConfigService, UsersService],
    },
  ],
  imports: [
    HttpModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('auth.secret'),
        signOptions: {
          expiresIn: config.get<string>('auth.expires'),
        },
      }),
    }),
  ],
})
export class AuthModule {}
