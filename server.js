import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes/routes.js'
import dbCon from "./utlis/db.js";

const PORT = process.env.PORT || 8000;

dotenv.config()
const app=express()
dbCon()
app.use(cors())
app.use(express.json())
app.use('/api',routers)




app.listen(PORT,()=>{
    console.log('server is running')
})