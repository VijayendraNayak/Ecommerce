const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct,getProduct ,getSearch, ReviewProduct} = require("../controllers/productcontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router = express.Router();

router.get("/getallproducts",getallproducts)
router.post("/create",isAuthenticated,authorizeRoles("admin"), createProduct)
router.put("/admin/update/:id",isAuthenticated,authorizeRoles("admin"), updateProduct)
router.delete("/admin/delete/:id",isAuthenticated,authorizeRoles("admin"), deleteProduct)
router.get("/admin/getproduct/:id",getProduct)
router.get("/get",getSearch)
router.put("/review/:id",isAuthenticated,ReviewProduct)

module.exports = router;