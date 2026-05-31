import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const hero = await prisma.heroContent.findFirst();
    return NextResponse.json(hero || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.heroContent.findFirst();
    const targetId = existing?.id || 'singleton_hero';

    const hero = await prisma.heroContent.upsert({
      where: { id: targetId },
      update: body,
      create: { id: targetId, ...body },
    });

    revalidatePath('/');
    return NextResponse.json(hero);
  } catch (error) {
    console.error("Database upsert failed:", error);
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
