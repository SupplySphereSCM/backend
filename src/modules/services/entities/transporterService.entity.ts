import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TransporterService{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    priceWithinState:number;

    @Column()
    priceInterState:number;

    @Column()
    priceInternationl:number;

    @OneToOne(()=> User,(user)=> user)
    user:User;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}