import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupplyChain } from "./supply-chain.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { RawMaterial } from "src/modules/raw-materials/entities/raw-material.entity";
import { Service } from "src/modules/services/entities/service.entity";


export enum STAGE {
    ORDERRECEIVED = "ORDER RECEIVED",
    PROCESSING = "PROCESSING",
    DELIVERED = "DELIVERED"
}

@Entity()
export class SupplyChainSteps {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=> SupplyChain,(supplychain)=>supplychain.steps)
    supplyChain: SupplyChain;

    @Column()
    from:User;

    @Column()
    to: User;

    @Column()
    goods : RawMaterial[];

    @Column()
    services: Service[];

    
    @Column({
        type: 'enum',
        enum: STAGE,
        default: STAGE.ORDERRECEIVED,
      })
    orderStatus: STAGE;
}