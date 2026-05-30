import { prisma } from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export default async function ServicesAdminPage() {
  let services = [];
  try {
    services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
  } catch(e) {}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Manage Services</h1>
      <ServicesClient initialData={services} />
    </div>
  );
}
