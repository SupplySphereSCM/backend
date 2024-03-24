import { Response } from 'express';
import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { EmailLoginDto } from './dto/email-login-user.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.register(emailRegisterDto);
  }

  @Post('login')
  async login(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.login(emailLoginDto);
  }
}
