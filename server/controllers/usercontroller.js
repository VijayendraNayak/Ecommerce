const { asyncErrHandler } = require('../middleware/asyncerrorHandler')
const User = require('../models/usermodel')
const { errorHandler } = require('../utils/errorHandler')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = asyncErrHandler(async (req, res, next) => {
    const { name, email, password } = req.body
    const newpassword = bcrypt.hashSync(password, 10)
    const user = await User.create({ name, email, password: newpassword })
    if (!user) { return next(errorHandler(400, "User isn't created")) }
    res.status(200).json({ success: true, user })
})

exports.login = asyncErrHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) { return next(errorHandler(404, "User not found")) }
    const validpassword = bcrypt.compareSync(password, user.password)
    if (!validpassword) {
        return next(errorHandler(400, "wrong password, Try again"))
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
    const { password: pass, ...rest } = user._doc
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)
})
exports.logout = asyncErrHandler(async (req, res, next) => {
    res.clearCookie('access_token')
    res.status(200).json({ success: true, message: "User logged out successfully" })
})