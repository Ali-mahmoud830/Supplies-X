'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';

export default function CatalogClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.title_en.toLowerCase().includes(search.toLowerCase()) ||
        product.title_ar?.includes(search) ||
        product.brand?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, search, selectedCategory]);

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
            placeholder="Search products, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white" onClick={() => setSearch('')}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Categories</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all font-medium ${
                !selectedCategory
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Categories
              <span className="float-right text-xs opacity-60">{initialProducts.length}</span>
            </button>
          </li>
          {categories.map((cat) => {
            const count = initialProducts.filter(p => p.categoryId === cat.id).length;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all font-medium ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.name_en}
                  <span className="float-right text-xs opacity-60">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-slate-400 text-sm">
          Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
          <span className="text-white font-semibold">{initialProducts.length}</span> products
        </p>
        <button
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-6 sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-72 bg-slate-900 p-6 shadow-2xl">
              <button className="absolute top-4 right-4 text-slate-400" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/catalog/${product.id}`}>
              <div className="group bg-slate-900/80 border border-white/5 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-0.5 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="h-44 bg-slate-800 flex items-center justify-center overflow-hidden relative">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-600">
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {product.category?.name_en}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {product.title_en}
                  </h3>
                  <h4 className="text-slate-500 text-sm mb-3 line-clamp-1" dir="rtl">
                    {product.title_ar}
                  </h4>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                      {product.brand && (
                        <span className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">{product.brand}</span>
                      )}
                      {product.origin && (
                        <span className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">🌍 {product.origin}</span>
                      )}
                    </div>
                    <span className="text-blue-400 text-xs font-semibold group-hover:text-blue-300">View →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-white font-semibold mb-2">No products found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
