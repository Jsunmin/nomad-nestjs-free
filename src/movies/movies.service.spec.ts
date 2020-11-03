import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// nestjs가 zest를 통해 테스트 ~ spec.ts 파일을 통해
// npm run test:cov ~ unit test
describe('MoviesService', () => {
    let service: MoviesService;

    // 테스트 시작전에 돌리는 것
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    afterAll( () => {
        console.log('test done');
        console.log('you can delete all data using test in this LC');
    })
    // 테스트 정의 및 예상되는 값 정의
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // 각 함수별 unit test
    describe('getAll', () => {
        it('should return array', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getOne', () => {
        it('should return a movie', () => {
            service.createOne({
                title: 'Test Movie',
                genres: ['test'],
                year: 2020
            });
            const movie = service.getOne(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });
        it('should throw 404 error', () => {
            try {
                service.getOne(999);
            } catch ( err ) {
                expect(err).toBeInstanceOf(NotFoundException);
                expect(err.message).toEqual('Not Fouind Movice with Id: 999');
            }
        });
    });

    describe('deleteOne', () => {
        it('should delete a movie', () => {
            service.createOne({
                title: 'Test Movie',
                genres: ['test'],
                year: 2020
            });
            const allMovies = service.getAll().length;
            service.deleteOne(1);
            const afterDelete = service.getAll().length;
            expect(afterDelete).toBeLessThan(allMovies);
        });
        it('should throw 404 error', () => {
            try {
                service.deleteOne(999);
            } catch ( err ) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        })
    });

    describe('createOne', () => {
        it('should create a movie', () => {
            const beforCreate = service.getAll().length;
            service.createOne({
                title: 'Test Movie',
                genres: ['test'],
                year: 2020
            });
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforCreate);
        });
        it('should throw 404 error', () => {
            try {
                service.deleteOne(999);
            } catch ( err ) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('updateOne', () => {
        it('should update a movie', () => {
            service.createOne({
                title: 'Test Movie',
                genres: ['test'],
                year: 2020
            });
            service.updateOne(1, {title: 'Updated Test'});
            const movie = service.getOne(1);
            expect(movie.title).toEqual('Updated Test');
        });
        it('should throw 404 error', () => {
            try {
                service.updateOne(999, {});
            } catch ( err ) {
                expect(err).toBeInstanceOf(NotFoundException);
            }
        });
    })
});
