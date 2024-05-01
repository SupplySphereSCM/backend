import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  subDescription: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column()
  code: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  tax: number;

  @ManyToOne(() => User, (user) => user.materials)
  @JoinTable()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
