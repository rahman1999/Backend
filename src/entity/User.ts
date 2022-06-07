import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm"
import { Cart } from "./Cart";
import { Orderdata } from "./Order";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    isAdmin:boolean

    @OneToMany(() => Cart,userid=>userid.cart)
    userid: Cart[];

    @OneToMany(() => Orderdata,orderid=>orderid.order)
    orderid: Orderdata[];


    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
  
}