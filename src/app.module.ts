import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    // express의 router 같은 역할
    controllers: [AppController],
    providers: [AppService],
})


export class aTestName {}
