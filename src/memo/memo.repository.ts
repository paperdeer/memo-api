import { Repository, EntityRepository } from "typeorm";
import { Memo } from "src/entities/memo.entity";
@EntityRepository(Memo)
export class MemoRepository extends Repository<Memo> {
}