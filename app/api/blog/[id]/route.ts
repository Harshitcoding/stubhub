import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    const userId = Number(id);
    const post = await prisma.post.findUnique({
      where: { id: userId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}
