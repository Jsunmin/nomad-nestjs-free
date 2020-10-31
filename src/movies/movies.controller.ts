import { Controller, Get, Post, Delete, Patch, Param, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

// /movies path로 시작하는 컨트롤러 모음
@Controller('movies')
export class MoviesController {
    // 이런식으로 비즈니스 로직 클래스와 연결 ( this.xx )
    constructor(private readonly moviesService: MoviesService) {}

    // /movies/ ~ 가 되겠지
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') yaer: string) {
        return `We are searching for a movie with a after: ${ yaer}`;
    }

    @Get('/:idd')
    // 파라미터를 원한다면 이렇게 선언해야 한다.
    getOne(@Param('idd') iddd: string): Movie {
        return this.moviesService.getOne(iddd);
    }

    // response statuscode 201 created로 사실상 리턴 void인데 자동으로 올바르게 처리해줌!
    @Post()
    create(@Body() movieData) {
        return this.moviesService.createOne(movieData);
    }

    @Delete('/:id')
    deleteOne(@Param('id') movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    // 리소스의 전체 업데이트 Put / 일부 업데이트 Patch
    @Patch('/:id')
    patchOne(@Param('id') movieId: string, @Body() updateData) {
        return this.moviesService.updateOne(movieId, updateData);
    }
}
