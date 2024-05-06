import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionHash: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  subDescription: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  available: number;

  @Column()
  price: number;

  @Column()
  tax: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinTable()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
