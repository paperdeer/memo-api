import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { MemoModule } from 'src/memo/memo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule,MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
