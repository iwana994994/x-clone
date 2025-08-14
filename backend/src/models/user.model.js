import mongoose from 'mongoose';

const user = new mongoose.Schema(
     {  clerkId: {
            type: String,
            required: true,
            unique: true},
        email: {
            type: String,
            required: true,
           },
        name: {
            type: String,
            required: true},

        
        imageUrl: {
            type: String,
            required: true},
       
        }  
        
)

const User = mongoose.model('User', user);

export default User;
