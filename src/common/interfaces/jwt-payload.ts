import type { UserDocument } from 'src/modules/users/schemas/user.schema';

export type IJwtPayload = {
  iat: number;
  exp: number;
} & UserDocument;
