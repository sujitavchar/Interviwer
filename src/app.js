import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.set("trust proxy", 1);

const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));



app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//import routers

import userRouter from "./routes/user_routes.js"
import postRouter from "./routes/post_routes.js"
import commentRouter from "./routes/comment_routes.js"

//defining routes

app.use("/api/v1/users",userRouter);
app.use("/api/v1/content",postRouter );
app.use("/api/v1/comments",commentRouter );


export default app ;
