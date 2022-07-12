const { dbConfig } = require("../config");
const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(dbConfig);
    console.log("DB connected");
  } catch (err) {
    throw new Error(`Failed to connect to MongoDB.\n ${err}`);
  }
}

module.exports = { connectDb };
