const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct,getProduct ,getSearch} = require("../controllers/productcontroller");
const { isAuthenticated } = require("../middleware/Authenticated");
const router = express.Router();

router.get("/getallproducts",isAuthenticated,getallproducts)
router.post("/create", createProduct)
router.put("/update/:id", updateProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/getproduct/:id",getProduct)
router.get("/get",getSearch)

module.exports = router;