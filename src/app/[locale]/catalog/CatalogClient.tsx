'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Box } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useCartStore } from '@/lib/cart';
import { Button } from '@/components/ui/button';

export default function CatalogClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('Catalog');
  const cart = useCartStore();

  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.title_en.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.title_ar.includes(searchTerm) ||
                          (p.desc_en && p.desc_en.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg border-b border-slate-100 pb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            {t('filters')}
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedCategory === null 
                  ? 'bg-slate-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t('all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id 
                    ? 'bg-slate-100 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                {locale === 'en' ? cat.name_en : cat.name_ar}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            type="text"
            placeholder={t('search')}
            className="w-full pl-12 pr-4 py-6 bg-white border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-slate-500 text-sm font-medium px-2">
          <span>{t('showing')} <span className="text-slate-900 font-bold">{filteredProducts.length}</span> {t('of')} {initialProducts.length} {t('products')}</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Box className="h-16 w-16 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('empty')}</h3>
            <p className="text-slate-500">{t('emptySub')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link href={`/catalog/${product.id}`} key={product.id}>
                <div className="group h-full bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 flex flex-col relative">
                  
                  <div className="h-48 bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative border-b border-slate-100">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                    ) : (
                      <span className="text-slate-400 font-medium">No Image</span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <Badge className="w-fit mb-3 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shadow-none font-semibold">
                      {locale === 'en' ? product.category?.name_en : product.category?.name_ar}
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {locale === 'en' ? product.title_en : product.title_ar}
                    </h3>
                    <h4 className="text-sm font-medium text-slate-500 mb-2 line-clamp-1" dir={locale === 'en' ? 'rtl' : 'ltr'}>
                      {locale === 'en' ? product.title_ar : product.title_en}
                    </h4>
                    
                    <div className="flex flex-col gap-1 mb-4 text-xs font-medium text-slate-500">
                      <div className="flex justify-between">
                        <span>Brand:</span>
                        <span className="text-slate-900 font-semibold">{product.brand || 'Generic'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MPN:</span>
                        <span className="text-slate-900 font-mono">{product.mpn || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-blue-600 flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        {t('view')} <Box className="ml-1 h-4 w-4" />
                      </span>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 text-blue-700 hover:bg-blue-100 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          cart.addItem(product, 1);
                        }}
                      >
                        {t('addToQuote')}
                      </Button>
                    </div>
                  </div>
                  </div>
                </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
