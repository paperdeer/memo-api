import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoController } from './memo.controller';
import { MemoRepository } from './memo.repository';
import { MemoService } from './memo.service';
@Module({
    imports:[TypeOrmModule.forFeature([MemoRepository])],
    controllers :[MemoController],
    providers:[MemoService]

})
export class MemoModule {}
