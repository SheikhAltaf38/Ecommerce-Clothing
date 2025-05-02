const mongoose= require("mongoose")

const dbconnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    } catch (error) {
        console.log("error in connecting database :",error.message)
        process.exit(1)
    }
}
module.exports= dbconnect;