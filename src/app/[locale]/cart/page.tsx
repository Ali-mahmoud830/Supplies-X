import { Navbar } from '@/components/Navbar';
import CartClient from './CartClient';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      include: { category: true },
    });
  } catch (error) {
    console.error('Failed to fetch products for cart bulk pad:', error);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Quote List (RFQ Cart)</h1>
        <CartClient initialProducts={products} />
      </main>
    </div>
  );
}
