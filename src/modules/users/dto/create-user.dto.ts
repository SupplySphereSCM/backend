import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

import { ROLES } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  profilePictureUrl?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @ApiHideProperty()
  @IsEmpty()
  isEmailVerified?: boolean;

  @IsString()
  ethAddress?: string;

  @IsString()
  address?: string;

  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ROLES, { each: true })
  roles?: ROLES[];
}
