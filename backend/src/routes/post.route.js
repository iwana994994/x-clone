import express from "express";
import { createPost } from "../controllers/post.controller.js";

const route = express.Router();

route.post ("/",createPost)


export default route;
