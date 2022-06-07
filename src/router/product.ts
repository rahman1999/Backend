import * as express from "express";
const router = express.Router();
import {obj} from "../controller/productController";
import {verifytoken} from "../middleware/jwtverify"



router.post('/addproduct'  ,obj.addproduct);
router.get('/getproduct'  ,obj.getproduct);
router.get('/ordering'  ,obj.ordering);
router.post('/updateorder'  ,obj.updateorder);
router.get('/getproduct1'  ,obj.getproduct1);
router.post('/delproduct/:id'  ,obj.deleteproduct);
router.post('/updateproduct'  ,obj.updateproduct);
router.get('/singleproduct/:name'  ,obj.singleproduct);


export = router;