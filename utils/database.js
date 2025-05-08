import mongoose from 'mongoose';


let isConnected = false; // Track the connection status
export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // Enable strict query mode
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true; 
        // Update the connection status
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.log("MongoDB connection error", error);
    }
}