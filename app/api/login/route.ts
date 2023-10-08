import { connect } from "@/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/schema/users";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { password, email } = req;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 500 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Wrong password" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
    });
  }
}
