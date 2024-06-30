import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CaptchaValidationException } from '../captcha/exeptions/invalidCaptcha.exeption'
import { CaptchaService } from 'src/captcha/captcha.service';


@Catch(CaptchaValidationException)
export class CaptchaValidationFilter implements ExceptionFilter {
  catch(exception: CaptchaValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<Request>();
    // @ts-ignore
    const session = request.session;
    
    const captcha = CaptchaService.generateCaptcha();
    session.captcha = captcha.text;
    response.type('svg');
    response.send(captcha.data);
  }
}