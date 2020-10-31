import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    // get 라우터
    @Get()
    getHello(): string {
        // 서비스 호출: 비즈니스 로직(실제 API 내용)과 컨트롤러(url 명시) 분리
        return this.appService.getHello();
    }

    // 데코레이터는 꾸며주는 함수 or 클래스와 붙어있어야 한다.
    @Get('/hello')
    sayHello():string {
        return this.appService.getHi();
    }

}
