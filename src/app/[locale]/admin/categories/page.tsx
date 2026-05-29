export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      <CategoriesClient initialData={categories} />
    </div>
  );
}
