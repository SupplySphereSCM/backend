import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({
    name: Service.name,
  })
export class Service {
    @Column({})
    user_id:string;

    @Column({})
    Product_id:string;

}
