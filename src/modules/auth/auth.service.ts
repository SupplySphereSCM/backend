import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

// import { ROLES, User } from 'src/modules/users/entities/user.entity';

// import { IGoogleUser } from 'src/common/interfaces/google';

import { EmailLoginDto } from './dto/email-login-user.dto';
import { EmailRegisterDto } from './dto/email-register-user.dto';
import { instanceToPlain } from 'class-transformer';
import { RequestNonceDto } from './dto/request-nonce.dto';
import { verifySignatureDto } from './dto/verify-signature.dto';
import { recoverAddress } from 'viem';

@Injectable()
export class AuthService {
  // googleAuthClient = new google.auth.OAuth2({
  //   clientId: this.configService.get('google.clientId'),
  //   clientSecret: this.configService.get('google.clientSecret'),
  //   redirectUri: this.configService.get('google.redirectUri'),
  // });

  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
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

  async register(emailRegisterDto: EmailRegisterDto) {
    if (await this.userService.findByEmail(emailRegisterDto.email)) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(emailRegisterDto.password, salt);

    emailRegisterDto.password = passwordHash;

    const user = await this.userService.create({
      email: emailRegisterDto.email,
      roles: [...emailRegisterDto.role],
      firstName: emailRegisterDto.email.split('@')[0],
      password: emailRegisterDto.password,
    });

    const accessToken = await this.jwtService.signAsync(instanceToPlain(user), {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      accessToken,
      user,
    };
  }

  async login(createAuthDto: EmailLoginDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Password', {
        description: 'Invalid Password',
      });
    }

    const accessToken = await this.jwtService.signAsync(instanceToPlain(user), {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      accessToken,
      user,
    };
  }

  async generateNonce(requestnonce: RequestNonceDto) {
    const randomNumber = Math.random();
    const Nonce = Math.floor(randomNumber * 100000);
    return this.jwtService.signAsync(
      { nonce: Nonce, walletAddress: requestnonce.walletAddress },
      {
        expiresIn: '1d',
      },
    );
  }

  async verifySignature(verifySignaturedto: verifySignatureDto) {
    const { hash, signature, jwt } = verifySignaturedto;
    const hashByteArray = Uint8Array.from(Buffer.from(hash, 'hex'));
    const signatureByteArray = Uint8Array.from(Buffer.from(signature, 'hex'));
    const address = await recoverAddress({
      hash: hashByteArray,
      signature: signatureByteArray,
    });
    const decodedJWT = this.jwtService.decode(jwt);
    if (address === decodedJWT.walletAddress) {
      return this.userService.findByEthAddress(address);
    }
    throw new BadRequestException('Signature mismatch');
  }

  async deleteUser(userId: string) {
    console.log('DELETE USER:', userId);
    return this.userService.remove(userId);
  }
}
