import { Module } from '@nestjs/common';

import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 각 도메인별로 모듈화 시킨다.
@Module({
    imports: [MoviesModule],
    controllers: [AppController],
    // express의 router 같은 역할
})


export class aTestName {}
