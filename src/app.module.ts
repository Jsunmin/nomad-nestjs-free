import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// nest cli : nest g service & controller로 생성한 movies셋
@Module({
    imports: [],
    // express의 router 같은 역할
    controllers: [MoviesController],
    providers: [MoviesService],
})


export class aTestName {}
