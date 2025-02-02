import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    const username = clerkUser.primaryEmailAddress?.emailAddress
    const imageUrl = clerkUser.imageUrl;

    const { heading,content} = await req.json();

 
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { 
        username: username,
        imageUrl: imageUrl
      },
      create: { 
        id: userId, 
        username: username,
        imageUrl: imageUrl
      },
    });

    // Create the post
    const post = await prisma.post.create({
      data: {
        heading,
       content,
    userId: user.id, 
      },
     
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
  }
}



