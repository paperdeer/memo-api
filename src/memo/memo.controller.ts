import { Body, Controller, Delete, Get, Param, Post, Res,Logger } from '@nestjs/common';
import { MemoService } from './memo.service';
import { Memo } from 'src/entities/memo.entity';
import { memoContent } from './memo.type';
import { loginSchema,registerSchema } from 'src/user/user.schema';
import { ResponseMessage,Response } from 'src/util/response.util';


@Controller('my')
export class MemoController {
    constructor(
        private memoService : MemoService
    ){
        this.memoService = memoService;
    }
    @Get('list')
    async findAll() : Promise<Memo []>{
        const memoList = await this.memoService.findAll();
        Logger.log("asd");
        return Object.assign({
            data: memoList,
            statusCode : 200,
            statusMsg: `성공`,
        });
    }
    // @Post('/:memoId')
    // public async postMemo(@Body() memo : memoContent) : Promise<Response>{
    //     const { value }: { value: memoContent} = loginSchema.validate(memo);
    //     const memoCt = await this.memoService.postMemo(value);
    //     return new ResponseMessage().success().body(memoCt).build();
    // } 
    @Post(':memoId')
    async postMemo(@Body() memo : Memo) : Promise<string>{
        await this.memoService.postMemo(memo);
        return Object.assign({
            data : {...memo},
            statuscode : 201,
            statusMsg : '성공'
        });
    }


    @Get(':memoId')
    async findOne(@Param('memoId') id : string) : Promise<Memo>{
        const foundMemo = await this.memoService.findeOne(id);
        return Object.assign({
            data:foundMemo,
            statusCode : 200,
            statusMsg: `성공`,
        })
    }
}
