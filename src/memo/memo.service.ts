import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from 'src/entities/memo.entity';
import { Repository } from 'typeorm';
import { MemoRepository } from './memo.repository';
import { memoContent } from './memo.type';
@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(Memo) private memoRepository: MemoRepository,
      ){
        this.memoRepository = memoRepository;
      }

      findAll():Promise<Memo []>{
          return this.memoRepository.find();
      }
      findeOne(id:string):Promise<Memo>{
          return this.memoRepository.findOne({ where: {
            memoId:id
          }});
      }
    //   public async postMemo(memoContent : memoContent){
    //     const memoInfo = {
    //       title : memoContent.title,
    //       content : memoContent.content
    //     }
    //     return memoInfo;
    //   }
    async postMemo(memo : Memo):Promise<void>{
        const newMemo = await this.memoRepository.create();

        newMemo.content = memo.content;
        newMemo.title = memo.title;
        newMemo.memoId = memo.memoId;
        newMemo.id = memo.id;

        await this.memoRepository.save(newMemo);
    }
}
