import * as express from "express";
const router = express.Router();
import {obj} from "../controller/userController";



router.post('/signup'  , obj.signup);
router.post('/login'  ,obj.login);
router.get('/getuser'  ,obj.getuser);
router.post('/deluser/:id'  ,obj.deleteuser);





export = router;
