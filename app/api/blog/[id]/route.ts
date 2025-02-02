import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The correct type signature for Next.js route handlers
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const userId = Number(context.params.id);

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