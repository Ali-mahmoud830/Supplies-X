import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const categoryId = searchParams.get('categoryId');
  const brand = searchParams.get('brand');
  const origin = searchParams.get('origin');

  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          q ? {
            OR: [
              { title_en: { contains: q, mode: 'insensitive' } },
              { title_ar: { contains: q } },
              { desc_en: { contains: q, mode: 'insensitive' } },
              { desc_ar: { contains: q } },
            ]
          } : {},
          categoryId ? { categoryId } : {},
          brand ? { brand: { equals: brand, mode: 'insensitive' } } : {},
          origin ? { origin: { equals: origin, mode: 'insensitive' } } : {},
        ]
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title_en, title_ar, desc_en, desc_ar, categoryId, brand, origin, images, specifications } = body;

    const product = await prisma.product.create({
      data: { title_en, title_ar, desc_en, desc_ar, categoryId, brand, origin, images, specifications }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
