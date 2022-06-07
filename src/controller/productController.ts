import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Category } from "../entity/Category"
import { Product  } from "../entity/Product"
import  AppDataSource  from "../data-source";
import { Review } from "../entity/Review";
import { count } from "console";


class Productcls {

  async ordering(req:Request,res:Response){
  AppDataSource.getRepository(Product).createQueryBuilder("products").orderBy("products.product_order").getMany()
    .then(result=>{
      res.json({
        status:true,
      result:result,
     
      })
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
    })
  }


  async updateorder(req: Request, res: Response, next: NextFunction){
    console.log(req.body.id,req.body.product_order)
    const updateid=req.body.id
    const updatedata={
  product_order:req.body.product_order
    }
    var CartRepository = AppDataSource.getRepository(Product);
      await CartRepository.update(updateid,  updatedata )
          .then(response => {
              res.json({
                  response
              });
          }).catch(error => {
              res.json({
                  error
              });
          });
  }


  async singleproduct(req:Request,res:Response){
    const id=req.params.name;
const review=await AppDataSource.getRepository(Review).createQueryBuilder('review').select('AVG(review.review_rating)','rating')
.where('review.reviewid=:id',{id}).getRawOne();
await AppDataSource.getRepository(Product).find({relations:["reviewid"],where:{id:+id}})

.then(result=>{
      res.json({
        status:true,
      result:result,
      rating:review,
      // rat:review1
      })
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
    })
  }

    async getproduct(req:Request,res:Response){
      let root=AppDataSource.getRepository(Product)
      await root.find({relations:["product"]})
      .then(result=>{
        res.json({
          status:true,
        result:result,
    
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      })
    }



    async getproduct1(req:Request,res:Response){
      let take :any= req.query.limit;
      let skip1 :any=req.query.page; 
    
      let root=AppDataSource.getRepository(Product)
      await root.findAndCount({relations:["product"],take,skip:skip1*take})
      // AppDataSource.getRepository(Product).createQueryBuilder("products").orderBy("products.product_order")
      // .take(take).skip(skip1*take)
      // .getMany()
      .then(result=>{
        res.json({
          status:true,
        result:result,
    
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      })
    }
    
    
    async updateproduct(req: Request, res: Response, next: NextFunction){
      console.log(req.body)
      const updateid=req.body.id
      const updatedata={
    product_name:req.body.name,
    product_price:req.body.price,
    product_image:req.file.filename,
    product:req.body.product_id
      }
      var CartRepository = AppDataSource.getRepository(Product);
        await CartRepository.update(updateid,  updatedata )
            .then(response => {
                res.json({
                    response
                });
            }).catch(error => {
                res.json({
                    error
                });
            });
    }
    
    async deleteproduct(req:Request,res:Response){
      const getid=req.params.id
      let root=AppDataSource.getRepository(Product)
      await root.delete(getid)
      .then(result=>{
        res.json({
          status:true,
        result:result
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      })
    }
    
    
    
      async addproduct(req: Request, res: Response){
        console.log(req.body)
      
    console.log("image",req.file.filename)
      const product=new Product()
      product.product_name=req.body.name;
      product.product_price=req.body.price;
      product.product_image=req.file.filename;
    product.product=req.body.product_id;
    // return;
    
    
      var ProductRepository = AppDataSource.getRepository(Product);
      await ProductRepository.save(product)
      .then(result=>{
        res.json({
          msg:"Product Created",
          status:true,
          result:result
        });
      })
      .catch(err =>{  
       res.status(500).json({  
         error: err  
       });  
      });
      
      }


}

    export const obj=new Productcls();
