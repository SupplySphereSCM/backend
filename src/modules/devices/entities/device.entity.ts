import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: Device.name,
})
export class Device {
  @OneToMany(() => Transaction, (transaction) => transaction.device)
  transaction: Transaction[];

  @PrimaryColumn({})
  device_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
