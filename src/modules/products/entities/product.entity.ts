import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({
    name: Product.name,
  })
export class Product {
    @Column({})
    product_id:string;

    @Column({})
    product_name:string;

    @Column({})
    quantity:number;

    @Column({})
    price:number;

}
