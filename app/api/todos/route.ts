import { connect } from "@/app/dbconfig/dbconfig";
import userModel from "@/app/schema/users";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("user")?.value || "";
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ message: "Invalid userid" });
  }

  try {
    const id = new mongoose.Types.ObjectId(userId);
    const todos = await userModel.findById(id);
    console.log(todos);

    return NextResponse.json({
      success: true,
      todos: todos.todos,
    });
  } catch (err) {}

  return NextResponse.json({ message: "sdfsf" });
}

export async function POST(request: NextRequest) {
  const userId = request.cookies.get("user")?.value || "";

  try {
    const req = await request.json();
    const { title } = req;
    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid userid" });
    }

    // console.log(req);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: { todos: { title: title } },
      },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      todos: updatedUser.todos,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
