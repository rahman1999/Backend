import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as multer from "multer"
import  AppDataSource  from "./data-source"
import userRouter = require("./router/user");
import cartRouter = require("./router/cart");
import payRouter = require("./router/stripe");
import cateRouter = require("./router/category");
import orderRouter = require("./router/order");
import productRouter = require("./router/product");
import reviewRouter = require("./router/review");

import * as path from "path"
import swaggerjs = require('swagger-jsdoc')
import swaggerui=require('swagger-ui-express')
import {obj} from "./controller/userController";


const option={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Swagger',
      version:'1.0.0'
    },
    servers:[
      {
        url:'http://localhost:8000/'
      }
    ]
  },
  apis:[".index.ts"]
}
const swaggerapi=swaggerjs(option)


/** 
 * @swagger
 * 
 * /:
 * get:
 *    summary:check relation api
 *    description:get api working or not
 *    responses:
 *          200:
 *       description:To test get method
*/

const app = express()
app.use('/api',swaggerui.serve,swaggerui.setup(swaggerapi))
// app.get('/',obj.relation)


var session = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}); 
app.use(session);
declare module 'express-session' {
  export interface SessionData {
    users: string;
  }
}
app.use(function (req, res, next) {
  res.locals.users = req.session.users;
  next();
});
app.use(bodyParser.json())
app.use(cors())
app.use('/Images', express.static(path.join(__dirname,"Images")));

const storage=multer.diskStorage({
    destination:async(req,file,cb)=>{
      cb(null, 'frontend/public/Images')
    },
    filename:async(req,file,cb)=>{
      cb(null,Date.now()+path.extname(file.originalname))
    }
  })
  app.use(multer({storage:storage}).single('image'))
  

//route
app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.use('/payment',payRouter);
app.use('/order',orderRouter);
app.use('/product',productRouter);
app.use('/category',cateRouter);
app.use('/review',reviewRouter);



AppDataSource.initialize().then(async () => {
    console.log("Database connected")
}).catch(error => console.log(error))


app.listen(8000 , ()=>console.log("lisenting on port 8000"))




