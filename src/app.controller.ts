import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    home() {
    // home(@Req() req, @Res() res) {
        // console.log('this is req, res from express', req.headers, res.statusCode);
        // console.log(res.json()); // express식 사용법
        // 그러나 페스티파이 위에서 돌면 익스프레스식으로 못 씀..
        // Fastify와 연계하려면 express식 접근하면 안되겠지??.. - 비추천
        return 'Welcome to my Movie API';
    }
}
