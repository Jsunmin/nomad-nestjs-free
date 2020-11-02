import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// nest cli : nest g service & controller & module로 생성한 movies셋
@Module({
    // express의 router 같은 역할
    controllers: [MoviesController],
    // dependency injection ~ 이렇게 provider로 선언해주면 자동으로 nestjs가 컨트롤러에 import함
    providers: [MoviesService],
})
export class MoviesModule {}
