import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { CaptchaValidationException } from '../exeptions/invalidCaptcha.exeption';

@Injectable()
export class CaptchaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    //@ts-ignore
    const session = request.session;
    const captchaInput = request.body.captcha;

    if (!captchaInput) {
      throw new BadRequestException('CAPTCHA is required');
    }

    if (session.captcha !== captchaInput) {
      throw new CaptchaValidationException();
    }
    session.captcha = null;
    
    return true;
  }
}
