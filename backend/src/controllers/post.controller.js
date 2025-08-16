import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
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
