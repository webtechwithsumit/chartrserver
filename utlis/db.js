import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;


const dbCon = async()=>{
const URL= `mongodb+srv://${USERNAME}:${PASSWORD}@chartrapi.aiaenee.mongodb.net/?retryWrites=true&w=majority&appName=chartrapi`
    try {
       await  mongoose.connect(URL, { useNewUrlParser:true, useUnifiedTopology: true})
       console.log('databse is connected succesfully')
    } catch (error) {
        console.log('error is databse connection', error.message)
    }
}


export default dbCon
