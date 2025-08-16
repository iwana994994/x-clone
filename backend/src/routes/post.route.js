import express from "express";
import { createPost } from "../controllers/post.controller";

const route = express.Router();

route.post ("/",createPost)
route.get ("/",getPosts)

export default route;
