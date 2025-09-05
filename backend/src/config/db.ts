import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase=async function(){
   try {
    await mongoose.connect(MONGO_URI);
    console.log(`DB connected successfully`)
   } catch (error) {
    console.log("Could not connect to db",error);
    process.exit(1);
   }
}

export default connectToDatabase;