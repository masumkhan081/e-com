import mongoose from "mongoose";
require("dotenv").config();

const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "e-com-shop",
    });
    console.log("Mongodb connected!");
  } catch (error) {
    console.log("Mongodb not connected!");
  }
};

export default mongodbConnection;
