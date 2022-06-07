import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class Orderdata {
    
    @PrimaryGeneratedColumn({type:"smallint"})
    id: number;

    @Column({type:"varchar"})
    order_name: string

    @Column({type:"bigint"})
    order_total: Number

    @Column({type:"varchar"})
    order_image: string

    
    @ManyToOne(() => User,order=>order.orderid)
    order: User;

    @Column("simple-json",{ default:null })
    address: { city: string, country: string,line1:string,line2:string,postal_code:bigint,state:string };


    @Column({type:"varchar"})
    order_email: string


    @Column({type:"bigint"})
    order_phone: number

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
 
    
  
}


