const app=require('./app')
const dotenv=require("dotenv")
const connectToDB=require("./config/database")

dotenv.config({path:"server/config/config.env"})

connectToDB()

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port http://localhost:${process.env.PORT}`)
})