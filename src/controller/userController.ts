import { NextFunction, Request, Response } from "express"
import  AppDataSource  from "../data-source";
import { User } from "../entity/User"
import { Category } from "../entity/Category"
import { Product  } from "../entity/Product"
import jwt=require('jsonwebtoken')
import bcrypt = require("bcryptjs");




class Apicls {

  async getuser(req:Request,res:Response){
    let root=AppDataSource.getRepository(User)
    await root.findBy({ isAdmin:false })
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



  async deleteuser(req:Request,res:Response){
    const getid=req.params.id
    let root=AppDataSource.getRepository(User)
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


async  signup(req: Request, res: Response, next: NextFunction){
    const user = new User()
    user.name = req.body.name;
   user.email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password, salt);
    user.password =password;
    var UserRepository = AppDataSource.getRepository(User);
    await UserRepository.save(user)
     .then(result=>{
       res.json({
         msg:"User Created",
         status:true,
         result:result,
       });
     })
     .catch(err =>{  
      res.status(500).json({  
        error: err  
      });  
    });
};




async login(req: Request, res: Response, next: NextFunction){
    const UserRepository = AppDataSource.getRepository(User);
    console.log("passed",req.body,'name',req.body.name)
    var user = await UserRepository.findOneBy({ email:req.body.email });
    if (user) {
        console.log(typeof(user.password))
        console.log(typeof(req.body.password))
        const valid = await bcrypt.compare(req.body.password,user.password);
        console.log(valid)
        if (valid) {
          
          let session = req.session;
          session.users = user.name;
          var usertoken=jwt.sign({email:user.email,isAdmin:user.isAdmin,userid:user.id},'secret')
          var role=user.isAdmin
          // res.header('authtoken',usertoken).json(usertoken)

        res.json({usertoken,role});
        } else {
        res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};
}




export const obj=new Apicls();
