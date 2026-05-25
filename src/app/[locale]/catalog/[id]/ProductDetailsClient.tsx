'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCartStore } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Share2, Printer, Check } from 'lucide-react';
import { useRouter } from '@/i18n/routing';

export default function ProductDetailsClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Product');
  const addItem = useCartStore(state => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push('/cart');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: locale === 'en' ? product.title_en : product.title_ar,
          url: url
        });
      } catch (error) {
        console.error('Share failed', error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const specifications = product.specifications as Record<string, string> || {};

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 md:p-10 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Image Section */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl h-96 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.title_en} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-400 text-lg">{t('noImage')}</span>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-4 bg-slate-800" variant="secondary">{locale === 'en' ? product.category?.name_en : product.category?.name_ar}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{locale === 'en' ? product.title_en : product.title_ar}</h1>
            <h2 className="text-2xl font-medium text-slate-500" dir={locale === 'en' ? 'rtl' : 'ltr'}>
              {locale === 'en' ? product.title_ar : product.title_en}
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p className={locale === 'en' ? 'block' : 'hidden'}>{product.desc_en}</p>
            <p className={locale === 'ar' ? 'block text-right' : 'hidden'} dir="rtl">{product.desc_ar}</p>
          </div>

          <div className="flex gap-4 items-center pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">{t('quantity')}</span>
              <Input 
                type="number" 
                min={1} 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                className="w-24 text-center font-medium bg-slate-50" 
              />
            </div>
            <Button size="lg" onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 shadow-md transition-all">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('addToQuote')}
            </Button>
          </div>

          {/* B2B Collaboration Tools */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={handleShare} className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700">
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Share2 className="mr-2 h-4 w-4" />}
              {copied ? t('linkCopied') : t('share')}
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex-1 border-slate-200 hover:bg-slate-50 text-slate-700">
              <Printer className="mr-2 h-4 w-4" />
              {t('print')}
            </Button>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {Object.keys(specifications).length > 0 && (
        <div className="mt-16 relative z-10 print-specs">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">{t('techSpecs')}</h3>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 shadow-inner">
            <dl className="divide-y divide-slate-200">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 hover:bg-slate-100/50 transition-colors px-4 -mx-4 rounded-lg">
                  <dt className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{key}</dt>
                  <dd className="mt-1 text-sm text-slate-900 font-medium sm:mt-0 sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
