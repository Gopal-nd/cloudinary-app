import mongoose from "mongoose";


export const ConnectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://sce22am039:sce22am039@cluster0.j52luzh.mongodb.net/cloudinary')
        console.log('db connected')
    } catch (error) {
        mongoose.disconnect();
        process.exit(1);
    }
}