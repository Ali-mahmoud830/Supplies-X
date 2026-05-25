import prisma from '@/lib/prisma';
import RfqsClient from './RfqsClient';

export default async function RfqsPage() {
  const rfqs = await prisma.rFQ.findMany({
    include: {
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">RFQ Pipeline</h1>
      <RfqsClient initialData={rfqs} />
    </div>
  );
}
