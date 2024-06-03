import { userModel } from "@/models/user-model";
import connectMongo from "@/service/connectMongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, mobile, username, password, gender, photo, agreement } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name: name,
    email: email,
    mobile: mobile,
    username: username,
    password: hashedPassword,
    gender: gender,
    photo: photo,
    agreement: agreement,
  };


  try {
    await connectMongo();

    const newCreatedUser = await userModel.create(newUser);

    return new NextResponse("User has been created", {
      status: 201,
    });

  } catch (error) {
    console.error("User creation Error.", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};