import mongoose from "mongoose";
import logger from "./logger.js";
import dotenv from 'dotenv'

dotenv.config({
    path : './.env'
})


const connectdb = async ()=>{
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("DB Connected");
    } catch (error) {
        console.log(`erorr while connecting DB ${error.message}`);
        logger.info(`erorr while connecting DB ${error.message}`)
    }
}

export {connectdb}