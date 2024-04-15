
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ProductList{
    @Column({})
    product:string;

    @Column({})
    quantity:number;

    @Column({})
    price:number;

    @Column({})
    subaTotal:number;
}
@Entity({
    name:Invoice.name
})
export class Invoice {
    @PrimaryGeneratedColumn({})
    id: string;

    @ManyToOne(()=> User,(user) => user)
    from:User;

    @ManyToOne(()=> User,(user) => user)
    to:User;

    @Column({type:'jsonb'})
    products:ProductList[];

    @Column({})
    cgst:number;

    @Column({})
    sgst:number;

    @Column({})
    total:number;

    



}
