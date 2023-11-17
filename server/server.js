const app = require('./app')
const dotenv = require("dotenv")
const connectToDB = require("./config/database")
//handling uncaught exception
dotenv.config({ path: "server/config/config.env" })

process.on("uncaughtException",(err)=>{
    console.log(`error:${err.message}`)
    console.log('Shutting down the server because of uncaught exception');
    process.exit(1)
})

connectToDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on port http://localhost:${process.env.PORT}`)
})
console.log()
//If mongodb url is wrong
process.on("unhandledRejection", (err) => {
    console.log(`error:${err.message}`)
    console.log("Shutting down the server due to unhandled rejection")
    server.close(() => {
        process.exit(1)
    })
})

