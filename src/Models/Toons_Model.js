import mongoose,{Schema,Model, model} from "mongoose";
const ToonsSchema=new Schema({
    Title:{
        type:String,
        required:true,
        max:16,
    },
    Description:{
        type:String,
        required:true,
        min:10,
        max:500,
    },
    Summary:{
        type:String,
        required:true,
        min:10,
        max:100,
    },
    Character:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User_Model"
    }
})

export const ToonsModel=model("Toons_Model",ToonsSchema)