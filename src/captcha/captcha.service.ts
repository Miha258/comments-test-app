import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  static generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 3,
      color: true,
    });

    return {
      text: captcha.text,
      data: captcha.data,
    };
  }

  validateCaptcha(userCaptcha: string, sessionCaptcha: string): boolean {
    return userCaptcha === sessionCaptcha;
  }
}
