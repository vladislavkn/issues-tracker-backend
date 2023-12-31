import { registerAs } from '@nestjs/config';

export const AUTH_CONFIG_KEY = 'auth';

export type AuthConfig = {
  jwtSecret: string;
  salt: number;
  jwtExpiresIn: string;
};

export const authConfig = registerAs<AuthConfig>(AUTH_CONFIG_KEY, () => ({
  jwtSecret: process.env.JWT_SECRET,
  salt: parseInt(process.env.SALT),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
