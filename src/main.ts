import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["https://localhost:3000", "http://ibingo.link.s3-website.ap-northeast-2.amazonaws.com", "https://ibingo.link"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  }
  );
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
