import { User } from 'src/modules/users/entities/user.entity';

export type IJwtPayload = {
  iat: number;
  exp: number;
} & User;
