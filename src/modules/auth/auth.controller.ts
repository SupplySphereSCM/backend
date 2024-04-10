import { Response } from 'express';
import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { EmailLoginDto } from './dto/email-login-user.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';
import { ROLES } from '../users/entities/user.entity';
import { RequestNonceDto } from './dto/request-nonce.dto';
import { verifySignatureDto } from './dto/verify-signature.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // @Get('google')
  // async getGoogleAuthUrl(@Res() res: Response) {
  //   const url = await this.authService.getGoogleAuthUrl();
  //   res.redirect(url);
  // }

  // @Get('google/redirect')
  // async googleAuthRedirect(@Query('code') code: string) {
  //   const res = await this.authService.googleAuthRedirect(code);
  //   return res;
  // }

  @Post('register')
  async register(@Body() emailRegisterDto: EmailRegisterDto) {
    const accessToken = await this.authService.register(emailRegisterDto);
    const user = await this.userService.findByEmail(emailRegisterDto.email);
    return {
      accessToken,
      user,
    };
  }

  @Post('login')
  async login(@Body() emailLoginDto: EmailLoginDto) {
    const accessToken = await this.authService.login(emailLoginDto);
    const user = await this.userService.findByEmail(emailLoginDto.email);
    return {
      accessToken,
      user,
    };
  }

  @Post('request-nonce')
  async generateNonce(@Body() noncerequestDto: RequestNonceDto) {
    return this.authService.generateNonce(noncerequestDto);
  }

  @Get('me')
  async me(@CurrentUser() user: any) {
    console.log(user);
    return user;
  }

  @Post('verify-signature')
  async verifySignature(@Body() verifysignaturedto: verifySignatureDto) {
    return this.authService.verifySignature(verifysignaturedto);
  }
}
