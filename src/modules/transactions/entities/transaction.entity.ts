import { Device } from 'src/modules/devices/entities/device.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity({
    name: Transaction.name,
  })
export class Transaction {
    @Column({})
    transaction_id:string;

    @ManyToOne(()=>Device,(device)=>device.device_id)
    device:Device;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
