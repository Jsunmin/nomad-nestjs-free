import { Injectable } from '@nestjs/common';

// 실제 비즈니스 로직이 담기는 곳
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello Nest!';
    }
    getHi(): string {
        return 'Hi Nest!';
    }
}
