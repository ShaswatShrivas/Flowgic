import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validateData = UserSchema.safeParse(body);
    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const { username, email } = validateData.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    const exisitingUsername = await User.findOne({ username });
    if (exisitingUsername) {
      throw new Error("Username already exists.");
    }

    const newUser = await User.create(validateData.data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
