import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity({
    name: Service.name,
  })
export class Service {

    @OneToOne(()=>Product)
    @JoinColumn()
    Product:Product;

    @ManyToOne(()=> User,(user)=>user.id)
    user:User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
