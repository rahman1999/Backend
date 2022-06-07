import * as express from "express";
const router = express.Router();
import {obj} from "../controller/cartController";

router.post('/addcart'  ,obj.addcart);
router.post('/delcart/:id'  ,obj.deletecart);
router.get('/cartrel'  ,obj.cartrel);
router.post('/incupdate'  ,obj.incquantity);
router.post('/decupdate'  ,obj.decquantity);




export = router;
