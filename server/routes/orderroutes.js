const express=require("express")
const { newOrder } = require("../controllers/ordercontroller")
const router=express.Router()
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");

router.post("/createorder",isAuthenticated,newOrder)

module.exports=router