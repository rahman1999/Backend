import * as express from "express";
const router = express.Router();
import {obj} from "../controller/orderController";


router.get('/orderrel'  ,obj.orderrel);





export = router;
