'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CatalogClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.title_en.toLowerCase().includes(search.toLowerCase()) || 
                            product.title_ar.includes(search) ||
                            product.brand?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, search, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filtering */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Search</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search products, brands..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${!selectedCategory ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-slate-100'}`}
              >
                All Categories
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <button 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === cat.id ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-slate-100'}`}
                >
                  {cat.name_en}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Link key={product.id} href={`/catalog/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-slate-200">
              <div className="h-48 bg-slate-100 w-full rounded-t-lg overflow-hidden flex items-center justify-center">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.title_en} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-slate-400">No Image</span>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  {product.category?.name_en}
                </Badge>
                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{product.title_en}</h3>
                <h4 className="font-medium text-md text-slate-700 line-clamp-1" dir="rtl">{product.title_ar}</h4>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-slate-500">{product.brand || 'No Brand'}</span>
                  <span className="text-sm font-semibold text-blue-600">View Details</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
