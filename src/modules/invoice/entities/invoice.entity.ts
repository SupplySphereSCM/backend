import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ProductList {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  subaTotal: number;
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user)
  from: User;

  @ManyToOne(() => User, (user) => user)
  to: User;

  // @Column({ type: 'jsonb' })
  // particulars: ProductList;

  @OneToOne(()=>Order,(order)=>order.invoice)
  order:Order;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  subaTotal: number;

  @Column()
  cgst: number;

  @Column()
  sgst: number;

  @Column()
  total: number;
}
