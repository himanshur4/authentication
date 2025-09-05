import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from "cors"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";

const app=express();
app.use(express.json());
app.use(cors({
    origin:APP_ORIGIN,
    credentials:true
}))
app.use(cookieParser());

app.get("/",async(req,res,next)=>{
    try {
        throw new Error("This is test error");
        res.status(200).json({
        status:"healthy",
    })
    } catch (error) {
        next(error)
    }
});

app.use(errorHandler);

app.listen(PORT, async()=>{
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment.`);
    await connectToDatabase()
});


