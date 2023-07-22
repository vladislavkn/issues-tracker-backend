import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CAPTCHA_CONFIG_KEY } from 'src/config/captcha.config';

@Injectable()
export class CaptchaService {
  private secretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    const { secretKey } = configService.get(CAPTCHA_CONFIG_KEY);
    this.secretKey = secretKey;
  }

  async validateCaptcha(captchaResponse) {
    try {
      const captchaValidationResponse = await this.httpService.axiosRef.post<{
        success: boolean;
      }>('https://www.google.com/recaptcha/api/siteverify', {
        secretKey: this.secretKey,
        response: captchaResponse,
      });

      if (captchaValidationResponse.status !== 200) {
        return false;
      }

      return captchaResponse.data.success;
    } catch {
      return false;
    }
  }
}
