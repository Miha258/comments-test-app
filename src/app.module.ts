import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { CapchaModule } from './captcha/captcha.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommentsModule, 
    CapchaModule
  ],
})
export class AppModule {}