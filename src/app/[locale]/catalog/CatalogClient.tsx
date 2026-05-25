'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Box } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CatalogClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('Catalog');

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
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/5 p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/10 pb-4">
            <Filter className="h-5 w-5 text-blue-400" />
            {t('filters')}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === null 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {t('all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            type="text"
            placeholder={t('search')}
            className="w-full pl-12 pr-4 py-6 bg-slate-900/40 backdrop-blur-md border-white/10 text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-slate-400 text-sm font-medium px-2">
          <span>{t('showing')} <span className="text-white">{filteredProducts.length}</span> {t('of')} {initialProducts.length} {t('products')}</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
            <Box className="h-16 w-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">{t('empty')}</h3>
            <p className="text-slate-400">{t('emptySub')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link href={`/catalog/${product.id}`} key={product.id}>
                <div className="group h-full bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col relative">
                  
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="h-48 bg-slate-800/50 flex items-center justify-center p-4 overflow-hidden relative">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <span className="text-slate-500 font-medium">No Image</span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <Badge className="w-fit mb-3 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-0 transition-colors">
                      {locale === 'en' ? product.category?.name_en : product.category?.name_ar}
                    </Badge>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {locale === 'en' ? product.title_en : product.title_ar}
                    </h3>
                    <h4 className="text-sm font-medium text-slate-400 mb-4 line-clamp-1" dir={locale === 'en' ? 'rtl' : 'ltr'}>
                      {locale === 'en' ? product.title_ar : product.title_en}
                    </h4>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-400 flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        {t('view')} <Box className="ml-1 h-4 w-4" />
                      </span>
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
