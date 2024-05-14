import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToOne(() => Order, (order) => order.invoice)

  order: Order;

  @Column()
  logistics: string;

  @Column()
  particular: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  deliveryCharges: number;

  @Column()
  tax: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
