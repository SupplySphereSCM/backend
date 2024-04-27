import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { SupplyChain } from 'src/modules/supply-chain/entities/supply-chain.entity';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

export enum ROLES {
  MANUFACTURER = 'MANUFACTURER',
  SELLER = 'SELLER',
  TRANSPORTER = 'TRANSPORTER',
  RETAILER = 'RETAILER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  firstName?: string;

  @Column({
    nullable: true,
  })
  lastName?: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    default: false,
  })
  isEmailVerified: boolean;

  @Column({
    default: '/no-user.png',
  })
  profilePictureUrl?: string;

  @Column({
    nullable: true,
  })
  googleId: string;

  @Column({
    nullable: true,
  })
  ethAddress: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Service, (service) => service.user)
  services: Service[];

  @OneToMany(() => RawMaterial, (rawMaterials) => rawMaterials.user)
  materials: RawMaterial[];

  @OneToMany(() => SupplyChain, (supplychains) => supplychains.user)
  supplyChains: SupplyChain[];

  @OneToMany(() => SupplyChain, (supplychains) => supplychains.user)
  orders: SupplyChain[];

  @Column({
    type: 'enum',
    enum: ROLES,
    array: true,
  })
  roles: ROLES[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
