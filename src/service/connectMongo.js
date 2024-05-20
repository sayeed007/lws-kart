import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;
const cached = {};

async function connectMongo() {
    if (!MONGO_URI) {
        throw new Error(
            "Please define the MONGO_URI environment variable inside .env.local"
        );
    }
    if (cached.connection) {
        console.log('Connection stablish from cache.')
        return cached.connection;
    }
    if (!cached.promise) {
        // const opts = {
        //     bufferCommands: false,
        // };
        cached.promise = mongoose.connect(MONGO_URI
            // , opts
        );
    }
    try {
        cached.connection = await cached.promise;
    } catch (e) {
        cached.promise = undefined;
        throw e;
    }

    console.log('Connection stablish and returned.')
    return cached.connection;
}
export default connectMongo;
