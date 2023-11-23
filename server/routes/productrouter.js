const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct,getProduct ,getSearch} = require("../controllers/productcontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router = express.Router();

router.get("/getallproducts",getallproducts)
router.post("/create",isAuthenticated,authorizeRoles("admin"), createProduct)
router.put("/update/:id",isAuthenticated,authorizeRoles("admin"), updateProduct)
router.delete("/delete/:id",isAuthenticated,authorizeRoles("admin"), deleteProduct)
router.get("/getproduct/:id",getProduct)
router.get("/get",getSearch)

module.exports = router;