import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  photo: { type: String },// You can store the path to the photo or use a cloud storage URL
  agreement: { type: Boolean, required: true }
});


export const userModel = mongoose.models.user ?? mongoose.model("user", userSchema);