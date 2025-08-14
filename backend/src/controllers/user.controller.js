import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
export const userSync = async (req, res) => {
    console.log('userSync route hit', req.auth);
      await connectDB(); 
      console.log('Connecting to MongoDB...');
      console.log("Connected to:", mongoose.connection.name, mongoose.connection.host);

    try {
        const { userId } = req.auth; // dohvat iz Clerk middleware-a
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found' });
        }

        const user = await clerkClient.users.getUser(userId);
        console.log('Fetched user from Clerk:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
            await User.create({
  clerkId: user.id,
  email: user.emailAddresses?.[0]?.emailAddress || "no-email@example.com",
  name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "No Name",
  imageUrl: user.imageUrl || "",
  username: user.username || `user_${user.id.slice(0, 6)}`,
               });

        console.log('User created in local database:', user.id);

        console.log('User synced successfully:', user.id);
        res.status(200).json(user);

    } catch (error) {
        console.error('Error in userSync:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
