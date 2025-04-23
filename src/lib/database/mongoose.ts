import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

console.log(MONGODB_URL);

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// store it globally to use across modules
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  console.log("Connecting to database")
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    console.error("Missing MONGODB_URL environment variable");
    throw new Error("Database connection failed: Missing MONGODB_URL");
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "pharmaQuest",
        bufferCommands: false,
      });

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Database connection error:", error);
    cached.promise = null;
    throw new Error("Database connection failed. Please try again later.");
  }
};