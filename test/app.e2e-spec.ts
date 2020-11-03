import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { aTestName } from '../src/app.module';

// 마찬가지로 zest를 통해 테스트 (e2e ~ 전체 시스템, 스토리 테스트)
describe('AppController (e2e)', () => {
    let app: INestApplication;

    // nestjs는 각 테스트마다 모듈을 생성해서 제공함 ~ 각 테스트에서 유기적인 연결힘들다..
    // beforeEach(async () => {
    //     console.log('beforeEach run!');
    // 테스트 전 하나의 모듈 생성 후 활용
    beforeAll(async () => {
        console.log('beforeAll run!');
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [aTestName],
        }).compile();
        app = moduleFixture.createNestApplication();
        // 실제 앱환경과 맞추려면, 파이프라인도 똑같이 구현해줘야 한다!
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true, // 설정한 class에 명시한 필드 validation
            forbidNonWhitelisted: true, // 명시하지 않은 필드 validation
            transform: true, // 통신을 통해 온 string data를 명시한 form으로 전환함
        }));
        await app.init();
    });

    // url에 대한 요청 테스트 ( url 서비스를 구성하는 모든 기능을 테스트할 수 있다!!)
    it('/ (GET)', () => {
        return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome to my Movie API');
    });

    describe('/movies', () => {
        it('GET 200', () => {
            return request(app.getHttpServer())
            .get('/movies')
            .expect(200)
            .expect([]);
        });
        it('POST 201', () => {
            return request(app.getHttpServer())
            .post('/movies')
            .send({
                title: 'Test',
                year: 2020,
                genres: ['test'],
            })
            .expect(201);
        });
        it('POST 400', () => {
            return request(app.getHttpServer())
            .post('/movies')
            .send({
                title: 'Test',
                year: 2020,
                genres: ['test'],
                other: 'thing',
            })
            .expect(400);
        });
        it('DELETE 404', () => {
            return request(app.getHttpServer())
            .delete('/movies')
            .expect(404);
        });
    });

    describe('/movies/:id', () => {
        it('GET 200', () => {
            // 위에서 생성한 1을 가져옴 ~ 모듈 리셋안하니까
            return request(app.getHttpServer())
                .get('/movies/1')
                .expect(200);
        });
        it('GET 404', () => {
            return request(app.getHttpServer())
                .get('/movies/999')
                .expect(404);
        });
        it('PATCH 200', () => {
            return request(app.getHttpServer())
                .patch('/movies/1')
                .send({ title: 'Updated Test' })
                .expect(200);
        });
        it('DELETE 200', () => {
            return request(app.getHttpServer())
                .delete('/movies/1')
                .expect(200);
        });
    });
});
