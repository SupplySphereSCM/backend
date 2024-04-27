import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ProductList {
  @Column()
  product: Product;

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

  @Column({ type: 'jsonb' })
  products: ProductList[];

  @Column()
  cgst: number;

  @Column()
  sgst: number;

  @Column()
  total: number;
}
