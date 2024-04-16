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
  name: string;

  @ManyToOne(() => User, (user) => user.services)
  @JoinTable()
  user: User;

  @Column({ default: 0 })
  quantity: number;

  @Column({})
  price: number;

  @Column({})
  tax: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({})
  description: string;

  @Column({})
  subDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
