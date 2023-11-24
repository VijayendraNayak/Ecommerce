const express=require("express");
const { register,login, logout, getUserDetails,updatePassword } = require("../controllers/usercontroller");
const { isAuthenticated } = require("../middleware/Authenticated");
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/userdetails",isAuthenticated, getUserDetails)
router.put("/password",isAuthenticated,updatePassword)

module.exports=router