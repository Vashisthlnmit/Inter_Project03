import { asynchandler } from "../Helpers/Asynchandler.js";
import { ApiError } from "../Helpers/ApiError.js";
import { UserModel } from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
export const authmidddleware=asynchandler(async(req,res,next)=>{
    try{
        const token=req.cookies?.Accesstoken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token);
        if(!token){
            throw new ApiError(400,"Unauthorized Request");
        }
        const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
        const user=await UserModel.findById(decodedtoken?._id);
        if(!user){
            throw new ApiError(400,"invalid access token");
        }
        req.user=user;
        next()
    }
    catch(err){
        console.log(err);
        throw new ApiError(400,"invalid access token");
    }
})