import { Navbar } from '@/components/Navbar';
import prisma from '@/lib/prisma';
import CatalogClient from './CatalogClient';

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  const categories = await prisma.category.findMany({
    orderBy: { name_en: 'asc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Smart Catalog</h1>
        <CatalogClient initialProducts={products} categories={categories} />
      </main>
    </div>
  );
}
