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
    let hero;
    if (existing) {
      hero = await prisma.heroContent.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      hero = await prisma.heroContent.create({
        data: body,
      });
    }
    revalidatePath('/');
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
