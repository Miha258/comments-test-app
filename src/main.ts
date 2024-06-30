import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { CaptchaValidationFilter } from './filters/captcha.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'dedj230djlsdlsakdsakdkk3d2kd30dlwd',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }));
  const config = new DocumentBuilder()
    .setTitle('Comments App')
    .setDescription('API documentation for Comments App')
    .setVersion('1.0')
    .addTag('comments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new CaptchaValidationFilter());
  await app.listen(3000);
}
bootstrap();
