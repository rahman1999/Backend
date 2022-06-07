import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product";

@Entity()
export class Review {
    
    @PrimaryGeneratedColumn({type:"smallint"})
    id: number;

    @Column({type:"varchar"})
    review_comment: string

    @Column({type:"bigint"})
    review_rating: Number

    @ManyToOne(() => Product,review=>review.reviewid)
    review: Product;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
 
    
  
}