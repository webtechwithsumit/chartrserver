import express from 'express'
import { create,get,Updated,Delete,getsingle ,getsingledata} from '../controllers/usercontrollers.js'

const routers=express.Router()

routers.post('/create',create)
routers.get('/get',get)
routers.get('/getsingle',getsingle)
routers.get('/getsingledata/:_id',getsingledata)
routers.put('/update/:id',Updated)
routers.delete('/delete/:id',Delete)



export default routers