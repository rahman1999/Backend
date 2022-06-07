import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Category } from "./Category"
import { Review }from "./Review"
@Entity()
export class Product {
    
    
    @PrimaryGeneratedColumn({type:"smallint"})
    id: number;

    @Column({type:"varchar"})
    product_name: string

    @Column({type:"bigint"})
    product_price: Number

    @Column({type:"varchar"})
    product_image: string

    @Column({type:"smallint"})
    product_order: Number

    @ManyToOne(() => Category,product=>product.categoryid)
    product: Category;


    @OneToMany(() => Review,reviewid=>reviewid.review)
    reviewid: Review[];

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
 
    
  
}