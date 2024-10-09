import { app } from "./app.js";
import dotenv from "dotenv"
import { DBConnect } from "./Helpers/DBConnect.js";
dotenv.config({
    path:"./.env"
})
function StartServer(){
    app.listen(process.env.PORT, () => {
        console.log("the server has started successfully");
    })
}
DBConnect()
.then(()=>{
    StartServer();
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
})