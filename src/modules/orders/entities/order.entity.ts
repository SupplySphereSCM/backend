import { ProductList } from "src/modules/invoice/entities/invoice.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum STATUS {
    ORDERED = 'ORDERED',
    TRANSIT = 'TRANSIT',
    DELIVERED = 'DELIVERED'
  }
export class Order {
    @PrimaryGeneratedColumn({})
    id: string;

    @Column({
        type: 'enum',
        enum: STATUS,
        default: STATUS.ORDERED,
      })
    orderStatus:STATUS;

    @ManyToOne(()=> User,(user) => user)
    from:User;

    @ManyToOne(()=> User,(user) => user)
    to:User;

    @Column({type:'jsonb'})
    products:ProductList[];

    @Column({})
    total:number;
}
