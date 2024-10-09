import nodemailer from "nodemailer"
import { ApiError } from "./ApiError.js";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.MAILPORT,
  secure: true, 
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});
export async function emailverificationmail(email,code) {
    try{
        const info = await transporter.sendMail({
            from: 'AnimeMangaToon.com', // sender address
            to: email, // list of receivers
            subject: "User Verification", // Subject line
            html:`<div>To complete your registration and verify your email address, please use the following One-Time Password ${code}:</div>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch(error){
        console.log(error);
        throw new ApiError(500,"some problem in sending email");
    }
}