import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { TransporterService } from 'src/modules/services/entities/transporterService.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum STATUS {
  ORDERED = 'ORDERED',
  TRANSIT = 'TRANSIT',
  DELIVERED = 'DELIVERED',
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

  @ManyToOne(() => User, (user) => user.toOrders)
  to: User;

  @ManyToOne(() => Product, (product) => product,{nullable:true})
  product: Product;

  @ManyToOne(() => Service, (service) => service,{nullable:true})
  service: Service;

  @ManyToOne(() => RawMaterial, (rawMaterial) => rawMaterial,{nullable:true})
  rawMaterial: RawMaterial;

  @ManyToOne(() => TransporterService, (Service) => Service,{nullable:true})
  transport: TransporterService;

  @Column()
  total: number;

  @OneToOne(()=> Invoice,(invoice)=>invoice)
  invoice : Invoice;
}
