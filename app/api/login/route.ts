import { connect } from "@/app/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import userModel from "@/app/schema/users";
import type { NextRequest } from "next/server";

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

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("user", user._id, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("user")?.value || "";
    // console.log('userid ", userId);
    console.log(userId);
    const user = await userModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid userid", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
