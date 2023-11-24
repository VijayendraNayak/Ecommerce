const express=require("express");
const { register,login, logout, getUserDetails,updatePassword, updateProfile, Numberofproducts } = require("../controllers/usercontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/userdetails",isAuthenticated, getUserDetails)
router.put("/password",isAuthenticated,updatePassword)
router.put("/update",isAuthenticated,updateProfile)
router.get("/noofpro",isAuthenticated,authorizeRoles("admin"), Numberofproducts)

module.exports=router