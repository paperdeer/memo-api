import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'memo',schema:'memo'})
export class Memo{
    @PrimaryGeneratedColumn({
        name: "user_id"
    })
    id:number;
    
    @Column()
    memoId : string;

    @Column()
    title : string;

    @Column()
    content : string;
}