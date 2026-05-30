import prisma from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';

export default async function PortfolioAdminPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  } catch(e) {}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Manage Portfolio Projects</h1>
      <PortfolioClient initialData={projects} />
    </div>
  );
}
