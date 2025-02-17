import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/posts-app")
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB connection error"));
};

export default connection;
