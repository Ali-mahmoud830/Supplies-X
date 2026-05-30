import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rfqs = await prisma.rFQ.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(rfqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rfqs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, ...rfqData } = body;
    
    const rfq = await prisma.rFQ.create({
      data: {
        ...rfqData,
        items: {
          create: items?.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity || 1
          })) || []
        }
      }
    });
    return NextResponse.json(rfq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create rfq' }, { status: 500 });
  }
}
