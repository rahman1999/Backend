import "reflect-metadata"
import {DataSource } from "typeorm"
import { User } from "./entity/User"
import { Category } from "./entity/Category"
import { Product } from "./entity/Product"
import { Cart } from "./entity/Cart"
import { Orderdata } from "./entity/Order"
import { Review } from "./entity/Review"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "projectdb",
    entities: [User,Category,Product,Cart,Orderdata,Review],
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: [],
    
})

export default AppDataSource

