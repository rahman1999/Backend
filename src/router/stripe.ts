import * as express from "express";
const router = express.Router();
import {obj} from "../controller/stripeController";
import {verifytoken} from "../middleware/jwtverify"

router.post('/order'  ,verifytoken,obj.order);
router.post('/verify'  ,obj.verify);
// router.post('/orderdata'  ,obj.orderdata1);





export = router;
