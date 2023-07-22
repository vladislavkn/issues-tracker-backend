import { registerAs } from '@nestjs/config';

export const CAPTCHA_CONFIG_KEY = 'auth';

export type CaptchaConfig = {
  secretKey: string;
};

export const authConfig = registerAs<CaptchaConfig>(CAPTCHA_CONFIG_KEY, () => ({
  secretKey: process.env.CAPTCHA_SECRET_KEY,
}));
