import { IsEmail, IsEnum, IsString } from 'class-validator';

import { ROLES } from 'src/modules/users/schemas/user.schema';

export class EmailRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @IsString()
  // @IsEnum(ROLES)
  // role?: ROLES[];
}
