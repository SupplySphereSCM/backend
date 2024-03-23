import { SetMetadata } from '@nestjs/common';

export const ROLE = 'roles';
export const Roles = (...args: string[]) => SetMetadata(ROLE, args);
