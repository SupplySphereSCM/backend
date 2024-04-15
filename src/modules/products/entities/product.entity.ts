import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity({
  name: Product.name,
})
export class Product {
  @PrimaryColumn({})
  product_id: string;

  @Column({})
  product_name: string;

  @ManyToOne(() => User, (user) => user.services)
  @JoinTable()
  user: User;

  @Column({})
  quantity: number;

  @Column({})
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
