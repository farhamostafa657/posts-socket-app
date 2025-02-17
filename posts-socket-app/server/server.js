import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connection from "./DB/connection.js";
import postsModel from "./DB/models/Posts.model.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

connection();

const server = app.listen(port, () => {
  console.log("server is  listen on port 3000");
});

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("load", async () => {
    const posts = await postsModel.find();
    socket.emit("replyWithPosts", posts);
  });
  console.log(socket.id);
  console.log("socket works");

  socket.on("addpost", async (post) => {
    await postsModel.insertMany(post);
    const posts = await postsModel.find();
    console.log(posts);
    socket.emit("replyWithPosts", posts);
  });

  socket.on("deletePost", async (id) => {
    const deletesd = await postsModel.findByIdAndDelete(id);
    const posts = await postsModel.find();
    socket.emit("replyWithPosts", posts);
  });

  socket.on("search", async (titleData) => {
    const posts = await postsModel.find({
      title: { $regex: titleData, $options: "i" },
    });

    socket.emit("replyWithPosts", posts.length > 0 ? posts : "No Posts found");
  });
});
