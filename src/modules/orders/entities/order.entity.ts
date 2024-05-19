import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { TransporterService } from 'src/modules/services/entities/transporterService.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum STATUS {
  ORDERED = 'ORDERED',
  PROCESSING = 'PROCESSING',
  TRANSIT = 'TRANSIT',
  OFFLOADED = 'OFFLOADED',
  DELIVERED = 'DELIVERED',
}

export enum STEPTYPE {
  PROCURING = 'PROCURING',
  SERVICING = 'SERVICING',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ORDERED,
  })
  orderStatus: STATUS;

  @ManyToOne(() => User, (user) => user.fromOrders)
  from: User;

  @ManyToOne(() => User, (user) => user.via)
  via: User;

  @ManyToOne(() => User, (user) => user.toOrders)
  to: User;

  @ManyToOne(() => Product, (product) => product)
  product: Product;

  @ManyToOne(() => Service, (service) => service)
  service: Service;

  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial)
  rawMaterial: RawMaterial;

  @ManyToOne(() => TransporterService, (Service) => Service)
  transport: TransporterService;

  @Column({ type: 'enum', enum: STEPTYPE, default: STEPTYPE.PROCURING })
  stepType: STEPTYPE;

  @Column()
  total: number;

  @Column()
  tax: number;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  deliveryCharges: number;

  @Column({nullable:true})
  supplyChainEId: string;

  @Column({nullable:true})
  stepEid: string;

  @OneToOne(() => Invoice, (invoice) => invoice, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  invoice: Invoice;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
