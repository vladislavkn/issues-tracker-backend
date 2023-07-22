import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Response } from 'express';

@Controller('captcha')
export class CaptchaController {
  constructor(private captchaService: CaptchaService) {}

  @Post('validate')
  validate(
    @Body('captchaResponse') captchaResponse: string,
    @Res() response: Response,
  ) {
    const isValid = this.captchaService.validateCaptcha(captchaResponse);

    if (isValid) {
      response.json({ success: true });
    }

    response.status(HttpStatus.BAD_REQUEST).json({ success: false });
  }
}
