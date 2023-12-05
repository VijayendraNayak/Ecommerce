const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User should enter the name"],
        maxLength: 30,
        minLength: 4
    },
    email: {
        type: String,
        required: [true, "User should enter the email"],
        unique: true,
        validate: [validator.isEmail, "You can enter only your email id"]
    },
    password:{
        type:String,
        required:[true,"User should enter the password"],
        minLength:[8,"Password should have atleast 8 characters"]
    },
    avatar:{
        type:String,
        default:"https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

module.exports=mongoose.model("User",userSchema)