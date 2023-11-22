const productrouter = require('./routes/productrouter.js')
const userrouter = require('./routes/userrouter.js')
const express = require("express");
const app = express();
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

app.use('/api/product', productrouter)
app.use('/api/user', userrouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({ success: false, statusCode, message })
})
module.exports = app