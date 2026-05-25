import prisma from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      <CategoriesClient initialData={categories} />
    </div>
  );
}
