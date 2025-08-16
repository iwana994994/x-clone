import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";

const route = express.Router();

route.post ("/",createPost)


export default route;
