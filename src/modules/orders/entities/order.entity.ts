import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum STATUS {
  ORDERED = 'ORDERED',
  TRANSIT = 'TRANSIT',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ORDERED,
  })
  orderStatus: STATUS;

  @ManyToOne(() => User, (user) => user)
  from: User;

  @ManyToOne(() => User, (user) => user)
  to: User;

  @ManyToOne(() => Product, (product) => product)
  product: Product;

  @Column()
  total: number;
}
