import express from "express";
import { createPost, getPosts, getPost, getUserPosts } from "../controllers/post.controller.js";

const route = express.Router();

route.post ("/",createPost)
route.get("/", getPosts);
route.get("/:postId", getPost);
route.get("/user/:username", getUserPosts);


export default route;
