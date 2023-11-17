const mongoose=require("mongoose")

const connectToDatabase=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to mongodb database")
    })
}

module.exports=connectToDatabase;