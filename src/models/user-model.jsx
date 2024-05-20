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


const sampleUsersData = [
  {
    name: "John Doe",
    email: "john@example.com",
    mobileNumber: "1234567890",
    username: "johndoe",
    password: "password123",
    gender: "Male",
    photo: "https://example.com/profile.jpg"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    mobileNumber: "9876543210",
    username: "janesmith",
    password: "password456",
    gender: "Female",
    photo: "https://example.com/profile2.jpg"
  }
];
