import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ MongoDB is already connected.");
    return;
  }

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("❌ DATABASE_URL is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.DATABASE_URL);

    isConnected = !!conn.connections[0].readyState;

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected.");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
};
