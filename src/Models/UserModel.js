import mongoose,{Schema, model} from "mongoose";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const userschema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationcode:{
        type:String,
        default:null
    },
    verificationtime:{
        type:Date,
        default:null
    }
},{timestamps:true})
userschema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcryptjs.hash(this.password,10);
    next();
})
userschema.methods.isPasswordCorrect=async function(password){
    return await bcryptjs.compare(password,this.password);
}
userschema.methods.GenerateAccessToken=function(){
    const access_token=jwt.sign({
        _id:this._id,
        fullName:this.fullName,
       email:this.email,
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_CODEEXPIRY
    })
    return access_token
}
export const UserModel=model("User_Model",userschema);