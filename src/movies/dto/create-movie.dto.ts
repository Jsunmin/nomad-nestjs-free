import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    // class validator로 여러 조건을 손쉽게 테스트할 수 있다.
    // https://github.com/typestack/class-validator
    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}