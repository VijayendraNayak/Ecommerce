const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct,getProduct ,getSearch, ReviewProduct,getallcount} = require("../controllers/productcontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router = express.Router();

router.get("/getallproducts",getallproducts)
router.get("/admin/getallcount",isAuthenticated,authorizeRoles("admin"),getallcount)
router.post("/admin/create",isAuthenticated,authorizeRoles("admin"), createProduct)
router.post("/admin/update",isAuthenticated,authorizeRoles("admin"), updateProduct)
router.post("/admin/delete",isAuthenticated,authorizeRoles("admin"), deleteProduct)
router.post("/admin/getproduct",isAuthenticated,authorizeRoles("admin"),getProduct)
router.get("/get",getSearch)
router.put("/review/:id",isAuthenticated,ReviewProduct)

module.exports = router;