import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          phone: "+201000000000",
          email: "contact@supplies-x.com",
          addressEn: "Cairo, Egypt",
          addressAr: "القاهرة، مصر"
        }
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.settings.findFirst();
    const targetId = existing?.id || 'singleton_settings';

    const settings = await prisma.settings.upsert({
      where: { id: targetId },
      update: body,
      create: { id: targetId, ...body },
    });

    revalidatePath('/');
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Database upsert failed:", error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
