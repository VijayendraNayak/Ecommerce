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
        default:"Profile image here"
    },
    role:{
        type:String,
        default:"user"
    },
    resetpasswordtoken:String,
    resetpasswordexpire:Date,
})

module.exports=mongoose.model("User",userSchema)