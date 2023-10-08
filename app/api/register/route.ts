import { connect } from "@/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/schema/users";

connect();

export async function POST(request: NextRequest) {
  try {
    // console.log("here");
    const req = await request.json();
    const { username, password, email } = req;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 500 }
      );
    }

    const newUser = new userModel({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();

    return NextResponse.json({
      message: "User saved successfully",
      success: true,
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
    });
  }
}
