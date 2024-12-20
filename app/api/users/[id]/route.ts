import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundrError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundrError("User");

  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) throw new NotFoundrError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundrError("User");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundrError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundrError("User");

  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = UserSchema.partial().safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) throw new NotFoundrError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
