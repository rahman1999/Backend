import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Cart {
    
    @PrimaryGeneratedColumn({type:"smallint"})
    id: number;

    @Column({type:"varchar"})
    cart_name: string

    @Column({type:"bigint"})
    cart_price: Number

    @Column({type:"varchar"})
    cart_image: string

    
    @ManyToOne(() => User,cart=>cart.userid)
    cart: User;

    @Column()
    cart_quantity: number

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
 
    
  
}