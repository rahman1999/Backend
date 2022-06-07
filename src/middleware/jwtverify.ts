import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const verifytoken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(" ")[1];
    const token1=JSON.parse(token)
    console.log(token1)
  let jwtPayload;
    try {
         jwtPayload = jwt.verify(token1,'secret' );
         console.log("pay",jwtPayload)
            res.locals.jwtPayload = jwtPayload;
  console.log('final',jwtPayload)
  res.setHeader("token",jwtPayload);
  next();
          } catch (err) {
            
            res.status(401).send();
            return;
          }
};