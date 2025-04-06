import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGODB_URI,{
        dbName : "JOB Portal"
    }).then(()=> {
        console.log("Connected to Database")
    }).catch(err=>{
        console.log(`Some error occured while connecting to Database : ${err}`);
    })
}