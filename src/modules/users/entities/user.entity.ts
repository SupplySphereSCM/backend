import { Product } from 'src/modules/products/entities/product.entity';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

export enum ROLES {
  OWNER = 'OWNER',
  MANUFACTURER = 'MANUFACTURER',
  SELLER = 'SELLER',
  TRANSPORTER = 'TRANSPORTER',
  RETAILER = 'RETAILER',
}

@Entity({
  name: User.name,
})
export class User {
  @PrimaryGeneratedColumn({})
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
    default: 'no-user.png',
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
  services: Product[];

  @Column({
    type: 'enum',
    enum: ROLES,
    array: true,
    default: [ROLES.SELLER],
  })
  roles: ROLES[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
