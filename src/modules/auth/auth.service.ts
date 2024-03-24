import * as bcrypt from 'bcrypt';
import { google } from 'googleapis';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';

import { UsersService } from '../users/users.service';

import { ROLES, User } from '../users/schemas/user.schema';
import { IGoogleUser } from 'src/common/interfaces/google';

import { EmailLoginDto } from './dto/email-login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';

@Injectable()
export class AuthService {
  // googleAuthClient = new google.auth.OAuth2({
  //   clientId: this.configService.get('google.clientId'),
  //   clientSecret: this.configService.get('google.clientSecret'),
  //   redirectUri: this.configService.get('google.redirectUri'),
  // });

  constructor(
    private userService: UsersService,
    // private readonly jwtService: JwtService,
    // private readonly httpService: HttpService,
    // private readonly configService: ConfigService,
  ) {}

  // async getGoogleAuthUrl() {
  //   const url = this.googleAuthClient.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: ['openid', 'email', 'profile'],
  //     // state: JSON.stringify({ userId: user.id }),
  //     state: 'GOOGLE_STATE',
  //     hd: this.configService.get('app.backendDomain'),
  //     response_type: 'code',
  //   });
  //   return url;
  // }

  // async googleAuthRedirect(code: string) {
  //   const { tokens } = await this.googleAuthClient.getToken(code);

  //   const res = await this.httpService.axiosRef.get<IGoogleUser>(
  //     'https://openidconnect.googleapis.com/v1/userinfo',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${tokens.access_token}`,
  //       },
  //     },
  //   );

  //   let user = await this.userService.findByGoogleId(res.data.sub);
  //   if (!user) {
  //     user = await this.userService.create({
  //       googleId: res.data.sub,
  //       email: res.data.email,
  //       isEmailVerified: res.data.email_verified,
  //       firstName: res.data.given_name,
  //       lastName: res.data.family_name,
  //       profilePictureUrl: res.data.picture,
  //       role: [ROLES.OWNER],
  //     });
  //   }

  //   return this.jwtService.signAsync(instanceToPlain(user), {
  //     expiresIn: '1d',
  //   });
  // }

  async register(emailRegisterDto: EmailRegisterDto): Promise<User> {
    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(emailRegisterDto.password, salt);

    emailRegisterDto.password = passwordHash;

    return this.userService.create(emailRegisterDto);
  }

  async login(createAuthDto: EmailLoginDto) {
    return 'This action logs a user in';
  }
}
