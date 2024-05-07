import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TransporterService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionHash: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  priceWithinState: number;

  @Column()
  priceInterState: number;

  @Column()
  priceInternationl: number;

  @OneToOne(() => User, (user) => user)
  @JoinTable()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
