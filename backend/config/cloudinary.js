const cloudinary = require("cloudinary").v2
const multer = require("multer")
const dotenv = require("dotenv")

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // cloud_name:"dwtkncxfo",
    // api_key:"369729529713832",
    // api_secret: "sI3RsjK3md_PthO-QW0T_GSKOSY",
})

const storage = new multer.memoryStorage();

// async function uploadImageUtil(file){
//    const result= await cloudinary.uploader.upload(file,
//         { resource_type:"auto"}
//     );
//     return result;
// }
async function uploadImageUtil(file){
    return new Promise((resolve , reject)=>{
        const stream=  cloudinary.uploader.upload_stream(
             { resource_type:"auto"},
             (error,result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
             }
         );
         stream.end(file.buffer)
    })
  
}

const upload= multer({storage})
module.exports= {upload, uploadImageUtil}