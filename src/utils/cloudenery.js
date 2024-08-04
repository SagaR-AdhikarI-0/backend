import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name:process.env.CLOUDNERY_CLOUD_NAME,
  api_key:process.env.CLOUNERY_API_KEY,
  api_secret:process.env.CLOUNERY_API_SECRETS
});

const uploadOnCloudynery=async (localfilepath)=>{
    try {
        if(!localfilepath)
        {
            return null
        }
      const response= await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        console.log(response.url)
        return response
        
    } catch (error) {
        //remove the locally saved files from the server or device if the upload is failed
        fs.unlinkSync(localfilepath)
        console.log("Error")
    }
}


export {uploadOnCloudynery}