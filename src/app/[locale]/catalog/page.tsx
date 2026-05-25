export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/Navbar';
import prisma from '@/lib/prisma';
import CatalogClient from './CatalogClient';

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
      prisma.category.findMany({ orderBy: { name_en: 'asc' } }),
    ]);
  } catch (error) {
    console.error('Catalog: DB fetch failed, rendering empty state:', error);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Product Catalog</h1>
          <p className="text-slate-400">Browse our full range of industrial and B2B supply products.</p>
        </div>
        <CatalogClient initialProducts={products} categories={categories} />
      </main>
    </div>
  );
}
