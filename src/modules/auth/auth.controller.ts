import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { RequestNonceDto } from './dto/request-nonce.dto';
import { EmailLoginDto } from './dto/email-login-user.dto';
import { verifySignatureDto } from './dto/verify-signature.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';

import { Public } from 'src/common/decorators/public-api.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

import { User } from '../users/entities/user.entity';

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
  @Public()
  async register(@Body() emailRegisterDto: EmailRegisterDto) {
    return this.authService.register(emailRegisterDto);
  }

  @Post('login')
  @Public()
  async login(@Body() emailLoginDto: EmailLoginDto) {
    return this.authService.login(emailLoginDto);
  }

  @Post('request-nonce')
  @Public()
  async generateNonce(@Body() noncerequestDto: RequestNonceDto) {
    return this.authService.generateNonce(noncerequestDto);
  }

  @Get('me')
  async me(@CurrentUser() user: User) {
    delete user.password;
    return user;
  }

  @Post('verify-signature')
  @Public()
  async verifySignature(@Body() verifysignaturedto: verifySignatureDto) {
    return this.authService.verifySignature(verifysignaturedto);
  }

  @Delete()
  async deleteUser(@CurrentUser() user: User) {
    await this.authService.deleteUser(user.id);
    return null;
  }
}
