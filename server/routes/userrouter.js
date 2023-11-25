const express=require("express");
const { register,login, logout, getUserDetails,updatePassword, updateProfile,  numberOfUsers, getSingleUser, updateRole,deleteUser } = require("../controllers/usercontroller");
const { isAuthenticated, authorizeRoles } = require("../middleware/Authenticated");
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/userdetails",isAuthenticated, getUserDetails)
router.put("/password",isAuthenticated,updatePassword)
router.put("/update",isAuthenticated,updateProfile)
router.get("/admin/noofpro",isAuthenticated,authorizeRoles("admin"), numberOfUsers)
router.get("/admin/singleuser/:id",isAuthenticated,authorizeRoles("admin"), getSingleUser)
router.put("/admin/updaterole/:id",isAuthenticated,authorizeRoles("admin"), updateRole)
router.delete("/admin/delete/:id",isAuthenticated,authorizeRoles("admin"), deleteUser)
module.exports=router