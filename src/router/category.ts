import * as express from "express";
const router = express.Router();
import {obj} from "../controller/categoryController";
import { verifytoken } from "../middleware/jwtverify";


router.post('/addcategory'  ,obj.addcategory);
router.get('/getcategory',obj.getcategory);
router.post('/delcategory/:id',obj.deletecategory);
router.get('/editcategory/:name',obj.editcategory);
router.post('/updatecategory',obj.updatecategory);
router.get('/relation'  ,verifytoken,obj.relation);


export= router