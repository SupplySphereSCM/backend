import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';
import { ROLES } from 'src/modules/users/entities/user.entity';

export class EmailRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ROLES, { each: true })
  role?: ROLES[];
}
