import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/user.model.js';
import { connectDB } from '../config/db.js';

export const userSync = async (req, res) => {
    console.log('userSync route hit', req.auth);
  await connectDB();  // Ensure the database is connected before proceeding
      console.log('Connecting to MongoDB...');
   

    try {
       const { userId } = getAuth(req);

  // check if user already exists in mongodb
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser) {
    return res.status(200).json({ user: existingUser, message: "User already exists" });
  }
const clerkUser = await clerkClient.users.getUser(userId);


            const userData = {
  clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress || "no-email@example.com",
  name: clerkUser.firstName && clerkUser.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : "No Name",
  imageUrl: clerkUser.imageUrl || "",
  username: clerkUser.username || `user_${clerkUser.id.slice(0, 6)}`,
               };

        console.log('User created in local database:', clerkUser.id);

        console.log('  ❤   User synced successfully:', clerkUser.id);
        res.status(200).json(clerkUser);

    } catch (error) {
        console.error('Error in userSync:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
