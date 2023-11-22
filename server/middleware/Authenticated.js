const  jwt  = require("jsonwebtoken")
const User = require("../models/usermodel")
const { errorHandler } = require("../utils/errorHandler")
const { asyncErrHandler } = require("./asyncerrorHandler")

exports.isAuthenticated = asyncErrHandler(async (req, res, next) => {
    const { access_token } = req.cookies
    if (!access_token) { return next(errorHandler(400, "Login to view this page")) }
    const isVerified = jwt.verify(access_token, process.env.JWT_SECRET)
    req.user=await User.findById(isVerified.id)
    next()
})