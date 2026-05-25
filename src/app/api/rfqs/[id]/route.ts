import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rfq = await prisma.rFQ.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    
    if (!rfq) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rfq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RFQ' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const rfq = await prisma.rFQ.update({
      where: { id },
      data: { status }
    });
    return NextResponse.json(rfq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update RFQ' }, { status: 500 });
  }
}
