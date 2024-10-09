import { ApiError } from "./ApiError.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
export const uploadfile=async(localfilepath)=>{
    try{
        if(!localfilepath)return null;
        const responsefromcloud=await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto",
        });
        console.log(responsefromcloud);
        fs.unlinkSync(localfilepath);
        return responsefromcloud;
    }
    catch(err){
        console.log(err);
        fs.unlinkSync(localfilepath)
        return null;
    }
}
export const deletefile=async(localfilepath)=>{
    try{
        if(!localfilepath){
            throw new ApiError(400,"the file path is missing")
        }
        const response=await cloudinary.uploader.destroy(localfilepath);
        console.log(response);
        return response;
    }
    catch(err){
        console.log(err);
        return null;
    }
}