import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable() // 컨트롤러에 넣기 위함 (injection)
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if ( !movie ) {
            // NestJs가 제공하는 예외처리! (statuscode 404 / Not Found err)
            throw new NotFoundException(`Not Fouind Movice with Id: ${id}`);
        }
        return movie;
    }

    deleteOne(id: number): boolean {
        // 지정한 id에 대한 validation
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    createOne(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    updateOne(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({
            ...movie,
            ...updateData,
        });
    }
}
