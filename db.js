import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://codigo-patron:ryn1star@cluster0.gba40lv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('db connected')
    } catch (error) {
        console.log(error)
    }
}