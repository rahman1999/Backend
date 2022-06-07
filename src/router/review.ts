import * as express from "express";
const router = express.Router();
import {obj} from "../controller/reviewController";


router.post('/addreview'  ,obj.addreview);





export = router;
