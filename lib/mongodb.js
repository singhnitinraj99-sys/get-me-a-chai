import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside Netlify");
}

// Check if a global cache already exists to preserve the connection across function runs
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 1. If an active connection exists in the cache, reuse it instantly
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection promise exists, create a new one safely
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("New MongoDB Connection Established");
      return mongooseInstance;
    });
  }

  try {
    // Await the connection promise and save it to the cache
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure so it can retry
    console.error("MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
};

export default connectDB;