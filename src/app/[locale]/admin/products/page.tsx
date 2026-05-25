import prisma from '@/lib/prisma';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  const categories = await prisma.category.findMany({
    orderBy: { name_en: 'asc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      <ProductsClient initialData={products} categories={categories} />
    </div>
  );
}
