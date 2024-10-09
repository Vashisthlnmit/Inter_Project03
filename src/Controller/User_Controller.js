import { asynchandler } from "../Helpers/Asynchandler.js";
import { ApiError } from "../Helpers/ApiError.js";
import { ApiResponse } from "../Helpers/ApiResponse.js";
import { UserModel } from "../Models/UserModel.js";
import { emailverificationmail } from "../Helpers/Mail.js";
import { option } from "../Helpers/Option.js";
export const signup=asynchandler(async(req,res)=>{
    const { fullName,email,password } = req.body;
    console.log(fullName,email,password);
    if(!fullName || !email || !password){
        throw new ApiError(400,"some fields are missing")
    }
    const finduser = await UserModel.findOne({ email: email });
    if (finduser && finduser.isVerified) {
        throw new ApiError(400, "user already exist");
    }
    const generatecode = Math.floor(Math.random() * 100000);
    const codexpire = new Date();
    codexpire.setHours(codexpire.getHours() + 1);
    const newuser=await UserModel.create({
        fullName:fullName,
        email:email,
        password:password,
        verificationcode:generatecode,
        verificationtime:codexpire
    })
    emailverificationmail(email,generatecode);
    return res.json(new ApiResponse(200,true,"user registered successfully verification code has been sent to your email"));
})
export const signin=asynchandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "some fields are missing");
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        throw new ApiError(400, "no such user found");
    }
    if (user.isVerified == false) {
        throw new ApiError(400, "user not verified");
    }
    const checkpass = await user.isPasswordCorrect(password)
    if (!checkpass) {
        throw new ApiError(400, "password is incorrect")
    }
    const accesstoken = user.GenerateAccessToken();
    const resp = await UserModel.findById(user._id).select("-isVerified -verificationcode -verificationtime -createdAt -updatedAt -password");
    return res
        .status(200)
        .cookie("Accesstoken", accesstoken, option)
        .json(new ApiResponse(200, true, "user signed in successfully", resp));
})
export const verifyemail=asynchandler(async(req,res)=>{
    const { verifycode, email } = req.body;
    if (!verifycode || !email) {
        throw new ApiError(400, "some detail is missing")
    }
    const finduser = await UserModel.findOne({ email });
    if (!finduser) {
        throw new ApiError(400, "no such user exist with this email");
    }
    if (finduser.verificationcode == verifycode && finduser.verificationtime > Date.now()) {
        finduser.isVerified = true;
        finduser.verificationcode = null;
        finduser.verificationtime=null;
        await finduser.save();
        return res.json(new ApiResponse(200, true, "user verified successfully"));
    }
    else if (finduser.verificationcode != verifycode) {
        throw new ApiError(400, "verification code is not correct");
    }
    else {
        throw new ApiError(400, "verification timeout");
    }
})
export const Logout = asynchandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).clearCookie("Accesstoken", options).json(new ApiResponse(200, true, "user log out successfully"))}
)