const express=require("express");
const  {getallproducts,createProduct, updateProduct} = require("../controllers/productcontroller");
const router=express.Router();

router.get("/getallproducts",getallproducts)
router.post("/create",createProduct)
router.put("/update/:id",updateProduct)

module.exports=router;