import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  photo: { type: String } // You can store the path to the photo or use a cloud storage URL
});


export const userModel = mongoose.models.user ?? mongoose.model("user", userSchema);