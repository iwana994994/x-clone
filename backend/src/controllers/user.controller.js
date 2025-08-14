import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/user.model.js';
import { connectDB } from '../config/db.js';
import { getAuth } from '@clerk/express';


export const userSync = async (req, res) => {
    console.log('userSync route hit', req.auth);
  await connectDB();  // Ensure the database is connected before proceeding
      console.log('Connecting to MongoDB...');
   

   
       const { userId } = getAuth(req);

  // check if user already exists in mongodb
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser) {
    return res.status(200).json({ user: existingUser, message: "User already exists" });
  }
const clerkUser = await clerkClient.users.getUser(userId);


           const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);

  res.status(201).json({ user, message: "User created successfully" });
}