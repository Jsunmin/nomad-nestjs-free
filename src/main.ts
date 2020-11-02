import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { aTestName } from './app.module';

async function bootstrap() {
    // aTestName: root 모듈
    const app = await NestFactory.create(aTestName);
    // 파이프 ~ 미들웨어
    // validation을 위함! ~ ts로 정의한 class를 통해 데이터 체크
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // 설정한 class에 명시한 필드 validation
        forbidNonWhitelisted: true, // 명시하지 않은 필드 validation
        transform: true, // 통신을 통해 온 string data를 명시한 form으로 전환함
    }));
    await app.listen(3000);
}
bootstrap();
