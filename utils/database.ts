import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;
const mongodbUri = process.env.MONGODB_URI ?? ''

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect(mongodbUri, {dbName: 'demoNextApp'})
    } catch (error) {
        console.log(error)
    }

}