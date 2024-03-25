import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ROLES {
  OWNER = 'OWNER',
  PRODUCER = 'PRODUCER',
  MANUFACTURER = 'MANUFACTURER',
  WHOLESELLER = 'WHOLESELLER',
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
    type: 'enum',
    enum: ROLES,
    array: true,
    default: [ROLES.OWNER],
  })
  roles: ROLES[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
