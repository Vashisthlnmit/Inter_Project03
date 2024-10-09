import express,{urlencoded} from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express();
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
   origin:process.env.ORIGIN 
}))
export {app}
import { authrouter } from "./Router/authrouter.js";
import { toonrouter } from "./Router/toonsrouter.js";
app.use("/api/user",authrouter)
app.use("/api/toons",toonrouter)