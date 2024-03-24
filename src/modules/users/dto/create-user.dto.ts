import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

import { ROLES } from 'src/modules/users/schemas/user.schema';

export class CreateUserDto {
  // @IsString()
  // firstName?: string;

  // @IsString()
  // lastName?: string;

  // @IsString()
  // profilePictureUrl?: string;

  // @IsString()
  // @IsOptional()
  // googleId?: string;

  // @ApiHideProperty()
  // @IsEmpty()
  // isEmailVerified?: boolean;

  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  // @IsString({ each: true })
  // @IsEnum(ROLES)
  // role: ROLES[];
}
