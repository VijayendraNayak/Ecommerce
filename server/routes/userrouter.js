const express=require("express");
const { register,login, logout, getUserDetails,updatePassword, updateProfile,  numberOfUsers, getSingleUser, updateRole,deleteUser, google } = require("../controllers/usercontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/google",google)
router.get("/logout",isAuthenticated,logout)
router.put("/password",isAuthenticated,updatePassword)
router.put("/update",isAuthenticated,updateProfile)
router.get("/admin/noofuser",isAuthenticated,authorizeRoles("admin"), numberOfUsers)
router.post("/admin/singleuser",isAuthenticated,authorizeRoles("admin"), getSingleUser)
router.post("/admin/updaterole",isAuthenticated,authorizeRoles("admin"), updateRole)
router.post("/admin/delete",isAuthenticated,authorizeRoles("admin"), deleteUser)

module.exports=router