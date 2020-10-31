import { NestFactory } from '@nestjs/core';
import { aTestName } from './app.module';

async function bootstrap() {
    // aTestName: root 모듈
  const app = await NestFactory.create(aTestName);
  await app.listen(3000);
}
bootstrap();
