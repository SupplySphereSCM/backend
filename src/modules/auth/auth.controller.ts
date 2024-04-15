import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { EmailLoginDto } from './dto/email-login-user.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';
import { RequestNonceDto } from './dto/request-nonce.dto';
import { verifySignatureDto } from './dto/verify-signature.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public-api.decorator';

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
  @Public()
  async register(@Body() emailRegisterDto: EmailRegisterDto) {
    const accessToken = await this.authService.register(emailRegisterDto);
    const user = await this.userService.findByEmail(emailRegisterDto.email);
    return {
      accessToken,
      user,
    };
  }

  @Post('login')
  @Public()
  async login(@Body() emailLoginDto: EmailLoginDto) {
    const accessToken = await this.authService.login(emailLoginDto);
    const user = await this.userService.findByEmail(emailLoginDto.email);
    return {
      accessToken,
      user,
    };
  }

  @Post('request-nonce')
  @Public()
  async generateNonce(@Body() noncerequestDto: RequestNonceDto) {
    return this.authService.generateNonce(noncerequestDto);
  }

  @Get('me')
  async me(@CurrentUser() user: any) {
    console.log(user);
    return user;
  }

  @Post('verify-signature')
  @Public()
  async verifySignature(@Body() verifysignaturedto: verifySignatureDto) {
    return this.authService.verifySignature(verifysignaturedto);
  }
}
