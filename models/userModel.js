import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String,
 lastName: String,
 location: {
   type: String,
   default: "London",
 },
 role: {
   type: String,
   enum: ["user", "admin"],
   default: "user",
 }
});

export default mongoose.model('User', UserSchema)