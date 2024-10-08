import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SupplyChainSteps } from './supply-chain-steps.entity';

@Entity()
export class SupplyChain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  eid?: string;

  @Column({
    nullable: true,
  })
  transactionHash?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => SupplyChainSteps,
    (supplychainsteps) => supplychainsteps.supplyChain,
    { cascade: true, onDelete: 'CASCADE' },
  )
  steps: SupplyChainSteps[];

  @ManyToOne(() => User, (user) => user.supplyChains)
  @JoinTable()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
