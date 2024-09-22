import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config({
    path: "./.env"
});

connectDB();



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