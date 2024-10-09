import mongoose from "mongoose"
export async function DBConnect(){
    try{
        const connection=await mongoose.connect(`${process.env.DBCONNECTIONSTRING}/${process.env.DBNAME}`);
        console.log("The Database is connected Successfully",connection.connection.host);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}