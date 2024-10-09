import { ApiError } from "../Helpers/ApiError.js";
import { ApiResponse } from "../Helpers/ApiResponse.js";
import { asynchandler } from "../Helpers/Asynchandler.js";
import { ToonsModel } from "../Models/Toons_Model.js";
import { uploadfile } from "../Helpers/cloudinary.js";
export const addToon = asynchandler(async (req, res) => {
    const { Title,  Description,Summary } = req.body;
    if(!Title || !Description || !Summary){
        throw new ApiError(400, "Please fill in all fields");

    }
    if (!req.file) {
        throw new ApiError(200, "image is required to create add characters");
    }
    const cloudinaryresponse = await uploadfile(req.file.path);
    console.log(cloudinaryresponse);
    if (!cloudinaryresponse) {
        throw new ApiError(500, "failed to upload on server");
    }
    const response = await ToonsModel.create({
        Title:Title,
        Description:Description,
        Character:cloudinaryresponse?.url,
        Summary: Summary,
        owner:req.user._id
    })
    return res.json(new ApiResponse(200, true, "toon has been created succesfully"))
})
export const GetAllToon=asynchandler(async (req, res) => {
    const getallton=await ToonsModel.find({}).select("-owner");
    return res.json(new ApiResponse(200,true,"all toons added successfully",getallton))
})

export const DeleteToon=asynchandler(async(req,res,next)=>{
    const {toonid}=req.params
    if(!toonid){
        throw new ApiError("toon id is misssing")
    }
    const gettoon=await ToonsModel.findById(toonid);
    if(!gettoon){
        throw new ApiError(404,"toon not found")
    }
    const checkuser=gettoon.owner._id.equals(req.user._id);
    if(!checkuser){
        throw new ApiError(404,"sorry you are not authorised to request");
    }
    const response=await ToonsModel.findByIdAndDelete(toonid);
    return res.json(new ApiResponse(200,true,"toon has been deleted succesfully",response))
})
export const GetToonById=asynchandler(async(req,res,next)=>{
    const {toonid}=req.params
    if(!toonid){
        throw new ApiError("toon id is misssing")
    }
    const gettoon=await ToonsModel.findById(toonid).select("-owner");
    if(!gettoon){
        throw new ApiError(404,"toon not found")
    }
    return res.json(new ApiResponse(200,true,"toon fetched successfully",gettoon))
})