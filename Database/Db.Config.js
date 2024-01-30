import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const ConnectDB = async () => {

    

    const MongoDB_URL = process.env.MONGODBCONNECTIONSTRING;
    const Connection =await mongoose.connect(MongoDB_URL);
      
    console.log("__----MongoDB connected-----__")


    return Connection;
}
