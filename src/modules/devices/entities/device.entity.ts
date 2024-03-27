import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    
   
  } from 'typeorm';
  
  @Entity({
    name: Device.name,
  })
export class Device {
    @ManyToOne(()=>User,(user)=>user.id)
    user:User;

    @OneToMany(()=>Transaction,(transaction)=>transaction.device)
    transaction:Transaction[]

    @Column({})
    device_id:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
