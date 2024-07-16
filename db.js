import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/codigo-patron');
        console.log('db connected')
    } catch (error) {
        console.log(error)
    }
}