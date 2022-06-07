import { NextFunction, Request, Response } from "express"
import { Orderdata  } from "../entity/Order"
import { User  } from "../entity/User"
import jwt=require('jsonwebtoken')
import  AppDataSource  from "../data-source";


class Ordercls{
    async orderrel(req: Request, res: Response, next: NextFunction){

        const token = req.headers.authorization.split(" ")[1];
  const token1=JSON.parse(token)
  console.log(token1)
let jwtPayload;
  try {
       jwtPayload = jwt.verify(token1,'secret' );
       console.log("pay",jwtPayload)
          res.locals.jwtPayload = jwtPayload;
console.log('final',jwtPayload)
const userid=jwtPayload.userid
console.log(userid)
res.setHeader("token",jwtPayload);
  const root=await AppDataSource.getRepository(User).find({ where: { id:userid } ,relations:['orderid']})
  console.log(root)
  res.send(root);

        } catch (err) {
          
          res.status(401).send();
          return;
        }

    
    }
}

export const obj=new Ordercls();
