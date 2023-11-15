import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'IsAdmin';
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);
