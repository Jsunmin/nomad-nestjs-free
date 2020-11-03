import { Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 각 도메인별로 모듈화 시킨다.
@Module({
    imports: [MoviesModule],
    // 다른 컨트롤러 추가
    controllers: [AppController],
})


export class aTestName {}
