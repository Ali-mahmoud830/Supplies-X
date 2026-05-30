import { prisma } from '@/lib/prisma';
import HeroClient from './HeroClient';

export default async function HeroAdminPage() {
  let hero = null;
  try {
    hero = await prisma.heroContent.findFirst();
  } catch(e) {}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Manage Hero Content</h1>
      <HeroClient initialData={hero} />
    </div>
  );
}
