import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import app from "./app.js"

dotenv.config({
    path: "./.env"
});
 
const startserver = async ()=> {
    try {
        await connectDB();
        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`Server is listening on port ${process.env.PORT || 4000}`)
        })
    } catch (error) {
        console.log("Connetion with database FAILED ", error);
    }
}; 

startserver();
// const app = express();
// import express from "express";

// //this ia a js iffy for connecting to database. no need to call or export.
// (async () => {
//     try {
//         await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error" , (error)=>{
//             console.log("App not listening");
//             throw error
//         })
        
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// })() // Immediatelt get called here