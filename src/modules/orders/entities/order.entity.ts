import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { RawMaterial } from 'src/modules/raw-materials/entities/raw-material.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { TransporterService } from 'src/modules/services/entities/transporterService.entity';
import { STAGE } from 'src/modules/supply-chain/entities/supply-chain-steps.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: STAGE,
    default: STAGE.ORDERRECEIVED,
  })
  orderStatus: STAGE;

  @ManyToOne(() => User, (user) => user.fromOrders)
  from: User;

  @ManyToOne(() => User, (user) => user.toOrders)
  to: User;

  @Column()
  goods : RawMaterial[]|Product[];

  @Column()
  services: Service[]|TransporterService[];

  @Column()
  total: number;

  @OneToOne(()=> Invoice,(invoice)=>invoice)
  invoice : Invoice;
}
