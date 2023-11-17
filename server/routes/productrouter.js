const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct,getProduct } = require("../controllers/productcontroller");
const router = express.Router();

router.get("/getallproducts", getallproducts)
router.post("/create", createProduct)
router.put("/update/:id", updateProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/getproduct/:id",getProduct)

module.exports = router;