import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// export class UpdateMovieDto {
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsString({ each: true })
//     readonly genres?: string[];
// }

// 위를 손쉽게 구현 ~ PartialType: createDto와 동일한 form이지만 부분적 허용 가능하게!
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}