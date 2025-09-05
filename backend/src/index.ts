import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from "cors"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";

const app=express();
app.use(express.json());
app.use(cors({
    origin:APP_ORIGIN,
    credentials:true
}))
app.use(cookieParser());

app.get("/",catchErrors(async(req,res,next)=>{
    return res.status(200).json({
        status:"healthy",
    })
}));

app.use("/auth", authRoutes);



app.use(errorHandler);
app.listen(PORT, async()=>{
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment.`);
    await connectToDatabase()
});


