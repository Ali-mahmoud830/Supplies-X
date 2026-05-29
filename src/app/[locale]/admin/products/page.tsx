export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [p, c] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.category.findMany({
        orderBy: { name_en: 'asc' }
      })
    ]);
    products = p;
    categories = c;
  } catch (error) {
    console.error('Failed to fetch products/categories:', error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      <ProductsClient initialData={products} categories={categories} />
    </div>
  );
}
