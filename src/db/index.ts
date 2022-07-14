import { dbUrl } from '../config'
import mongoose from 'mongoose'

async function connectDb() {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB connected");
  } catch (err) {
    throw new Error(`Failed to connect to MongoDB.\n ${err}`);
  }
}

export { connectDb };
