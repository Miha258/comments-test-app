import { Controller, Get, Res, Session } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('captcha')
@Controller('captcha')
export class CaptchaController {
  @Get()
  @ApiOperation({ summary: 'Get a new CAPTCHA' })
  @ApiResponse({ status: 200, description: 'SVG CAPTCHA image' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getCaptcha(@Res() res: Response, @Session() session: Record<string, any>) {
    const captcha = CaptchaService.generateCaptcha();
    session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
  }
}