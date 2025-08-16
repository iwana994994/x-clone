import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import connectDB from "../config/db.js";
export const createPost = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Post must contain text" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.create({
      user: user._id,
      content,
    });

    res.status(201).json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserPosts = async (req, res) => {
    await connectDB();
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    
    
    };

export const getPost = async (req, res) => {
    await connectDB();
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate("user", "username firstName lastName profilePicture")

  if (!post) return res.status(404).json({ error: "Post not found" });

  res.status(200).json({ post });
};
export const getPosts = async (req, res) => {
    await connectDB();
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");

  res.status(200).json({ posts });
};