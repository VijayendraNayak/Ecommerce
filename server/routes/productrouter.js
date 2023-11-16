const express=require("express");
const  {getallproducts} = require("../controllers/productcontroller");
const router=express.Router();

router.get("/getallproducts",getallproducts)

module.exports=router;