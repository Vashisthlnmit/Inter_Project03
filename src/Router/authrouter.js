import Router from "express"
import { signin,signup,verifyemail,Logout } from "../Controller/User_Controller.js"
const authrouter=Router()
authrouter.post("/signup",signup)
authrouter.post("/signin",signin)
authrouter.post("/verify",verifyemail)
authrouter.post("/logout",Logout)
export {authrouter}