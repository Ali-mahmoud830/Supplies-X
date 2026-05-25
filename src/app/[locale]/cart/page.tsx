import { Navbar } from '@/components/Navbar';
import CartClient from './CartClient';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Quote List (RFQ Cart)</h1>
        <CartClient />
      </main>
    </div>
  );
}
