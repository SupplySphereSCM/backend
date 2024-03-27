import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({
    name: Transaction.name,
  })
export class Transaction {
    @Column({})
    transaction_id:string;

    @Column({})
    device_id:string;


}
