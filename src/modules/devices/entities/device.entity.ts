import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({
    name: Device.name,
  })
export class Device {
    @Column({})
    user_id:string;

    @Column({})
    device_id:string;

}
