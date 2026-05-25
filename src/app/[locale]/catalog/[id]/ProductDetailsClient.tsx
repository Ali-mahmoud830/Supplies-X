'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCartStore } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from '@/i18n/routing';

export default function ProductDetailsClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const locale = useLocale();
  const addItem = useCartStore(state => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push('/cart');
  };

  const specifications = product.specifications as Record<string, string> || {};

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.title_en} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-400 text-lg">No Image Available</span>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-4" variant="secondary">{product.category?.name_en}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.title_en}</h1>
            <h2 className="text-2xl font-medium text-slate-700" dir="rtl">{product.title_ar}</h2>
          </div>

          <div className="space-y-4 text-slate-600">
            <p className={locale === 'en' ? 'block' : 'hidden'}>{product.desc_en}</p>
            <p className={locale === 'ar' ? 'block text-right' : 'hidden'} dir="rtl">{product.desc_ar}</p>
          </div>

          <div className="flex gap-4 items-center pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">Quantity:</span>
              <Input 
                type="number" 
                min={1} 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                className="w-24 text-center" 
              />
            </div>
            <Button size="lg" onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-500">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Quote List
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {Object.keys(specifications).length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Technical Specifications</h3>
          <div className="bg-slate-50 rounded-lg p-6">
            <dl className="divide-y divide-slate-200">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-slate-600 uppercase">{key}</dt>
                  <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
