import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    busstart: {
        type: String,
        required: true
    },
    bus: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ending: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    numberplate: {
        type: String,
        required: true
    },
    randomId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5h' } // Automatically delete after 5 hours
      }
   
}, { timestamps: true })


const usermodel = mongoose.model('user', userSchema)

export default usermodel