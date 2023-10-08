import mongoose from "mongoose";

export const connect = () => {
  console.log("called");
  try {
    const url = process.env.MONGO_URL || "";

    mongoose.connect(url);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};
