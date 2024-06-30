import { HttpException, HttpStatus } from '@nestjs/common';

export class CaptchaValidationException extends HttpException {
  constructor() {
    super('CAPTCHA validation failed', HttpStatus.FOUND);
  }
}
