import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const rfqs = await prisma.rFQ.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    return NextResponse.json(rfqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RFQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client_name, company_name, email, phone, attached_file_url, items } = body;

    // items should be an array of { productId: string, quantity: number }
    const rfq = await prisma.rFQ.create({
      data: {
        client_name,
        company_name,
        email,
        phone,
        attached_file_url,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: { items: true }
    });
    return NextResponse.json(rfq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit RFQ' }, { status: 500 });
  }
}
