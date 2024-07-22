import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Obtener la URI desde las variables de entorno
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(mongoURI);
        console.log('DB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;