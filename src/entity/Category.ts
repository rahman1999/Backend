import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product";

@Entity()
export class Category{
    
    
    @PrimaryGeneratedColumn({type:"smallint"})
    id: Number

    @Column({type:"varchar"})
    category_name:string
    
    @OneToMany(() => Product,categoryid=>categoryid.product)
    categoryid: Product[];

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
  
}