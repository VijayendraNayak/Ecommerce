const express = require("express")
const { newOrder, getorderdetails, getmyorderdetails, getallorderdetails, deleteorder, updatestatus } = require("../controllers/ordercontroller")
const router = express.Router()
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");

router.post("/createorder", isAuthenticated, newOrder)
router.get("/admin/getorder/:id", isAuthenticated ,authorizeRoles('admin'), getorderdetails)
router.get("/myorder", isAuthenticated, getmyorderdetails)
router.get("/admin/allorder", isAuthenticated ,authorizeRoles('admin'), getallorderdetails)
router.delete("/admin/delete/:id", isAuthenticated ,authorizeRoles('admin'),deleteorder)
router.put("/admin/update/:id", isAuthenticated ,authorizeRoles('admin'),updatestatus)


module.exports = router