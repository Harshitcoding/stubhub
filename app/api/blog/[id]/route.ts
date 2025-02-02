import {  NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Change the function signature to use Request instead of NextRequest
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }>} }
) {
  try {
    const userId = parseInt(context.params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: userId,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'Error fetching post' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}