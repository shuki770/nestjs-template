import { SetMetadata } from '@nestjs/common';
import { ROLES_METADATA } from '../constances';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_METADATA, roles);
