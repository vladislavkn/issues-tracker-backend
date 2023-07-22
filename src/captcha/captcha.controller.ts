import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
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
      return response.status(200).send({ success: true });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send({ success: false });
    }
  }
}
