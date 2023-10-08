import { connect } from "@/app/dbconfig/dbconfig";
import userModel from "@/app/schema/users";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "Invalid userid" });
  }

  try {
    const todos = await userModel.findById(userId).select("todos");

    return NextResponse.json({
      success: true,
      todos,
    });
  } catch (err) {}

  return NextResponse.json({ message: "sdfsf" });
}

export async function POST(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");
  const todo = request.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid userid" });
    }

    user.todos.push(todo);

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Todo added successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
