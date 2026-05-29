export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import RfqsClient from './RfqsClient';

export default async function RfqsPage() {
  let rfqs: any[] = [];

  try {
    rfqs = await prisma.rFQ.findMany({
      include: {
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch rfqs:', error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">RFQ Pipeline</h1>
      <RfqsClient initialData={rfqs} />
    </div>
  );
}
