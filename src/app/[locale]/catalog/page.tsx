export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/Navbar';
import prisma from '@/lib/prisma';
import CatalogClient from './CatalogClient';

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
      prisma.category.findMany({ orderBy: { name_en: 'asc' } }),
    ]);
  } catch (error) {
    console.error('Catalog: DB fetch failed, rendering empty state:', error);
  }

  // Fallback Demo Engine: Inject 6 realistic B2B items if DB is empty or fails
  if (products.length === 0) {
    products = [
      {
        id: 'mock-1',
        title_en: '3M SecureFit Protective Hard Hat (H-701R)',
        title_ar: 'خوذة حماية 3M SecureFit (H-701R)',
        desc_en: 'Industrial grade protective hard hat with secure fit technology.',
        desc_ar: 'خوذة حماية صناعية بتقنية التثبيت الآمن.',
        brand: '3M',
        mpn: '3M-H701R',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=3M+Hard+Hat'],
        categoryId: 'cat-1',
        category: { id: 'cat-1', name_en: 'PPE & Safety', name_ar: 'معدات السلامة' }
      },
      {
        id: 'mock-2',
        title_en: 'Bosch Professional GSB 13 RE Impact Drill',
        title_ar: 'شنيور دقاق بوش بروفيشنال GSB 13 RE',
        desc_en: 'Heavy-duty impact drill for concrete and steel.',
        desc_ar: 'شنيور دقاق للخدمة الشاقة للخرسانة والصلب.',
        brand: 'Bosch',
        mpn: 'BSH-GSB13RE',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=Bosch+Impact+Drill'],
        categoryId: 'cat-2',
        category: { id: 'cat-2', name_en: 'Power Tools', name_ar: 'أدوات كهربائية' }
      },
      {
        id: 'mock-3',
        title_en: 'Schneider Electric 3-Pole MCB 16A',
        title_ar: 'قاطع تيار شنايدر إلكتريك 3 أقطاب 16 أمبير',
        desc_en: 'Miniature circuit breaker for industrial panels.',
        desc_ar: 'قاطع تيار مصغر للوحات الصناعية.',
        brand: 'Schneider Electric',
        mpn: 'SE-MCB3P16',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=Schneider+MCB'],
        categoryId: 'cat-3',
        category: { id: 'cat-3', name_en: 'Electrical', name_ar: 'كهربائيات' }
      },
      {
        id: 'mock-4',
        title_en: 'Caterpillar CAT S3 Safety Boots',
        title_ar: 'حذاء سلامة كاتربيلر CAT S3',
        desc_en: 'Steel toe cap, slip resistant industrial safety boots.',
        desc_ar: 'حذاء سلامة صناعي بمقدمة فولاذية ومقاوم للانزلاق.',
        brand: 'Caterpillar',
        mpn: 'CAT-S3-SB',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=CAT+Safety+Boots'],
        categoryId: 'cat-1',
        category: { id: 'cat-1', name_en: 'PPE & Safety', name_ar: 'معدات السلامة' }
      },
      {
        id: 'mock-5',
        title_en: 'Fluke 117 Electricians True RMS Multimeter',
        title_ar: 'جهاز قياس متعدد فلوك 117',
        desc_en: 'True RMS digital multimeter with non-contact voltage detection.',
        desc_ar: 'جهاز قياس رقمي مع كشف الجهد بدون تلامس.',
        brand: 'Fluke',
        mpn: 'FLK-117',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=Fluke+Multimeter'],
        categoryId: 'cat-3',
        category: { id: 'cat-3', name_en: 'Electrical', name_ar: 'كهربائيات' }
      },
      {
        id: 'mock-6',
        title_en: 'Honeywell Miller TurboLite Fall Protection Block',
        title_ar: 'كتلة حماية من السقوط هانيويل ميلر',
        desc_en: 'Personal fall limiter for elevated industrial work.',
        desc_ar: 'محدد سقوط شخصي للأعمال الصناعية المرتفعة.',
        brand: 'Honeywell',
        mpn: 'HW-M-TURBO',
        images: ['https://placehold.co/400x400/f8fafc/334155?text=Fall+Protection'],
        categoryId: 'cat-1',
        category: { id: 'cat-1', name_en: 'PPE & Safety', name_ar: 'معدات السلامة' }
      }
    ];

    if (categories.length === 0) {
      categories = [
        { id: 'cat-1', name_en: 'PPE & Safety', name_ar: 'معدات السلامة' },
        { id: 'cat-2', name_en: 'Power Tools', name_ar: 'أدوات كهربائية' },
        { id: 'cat-3', name_en: 'Electrical', name_ar: 'كهربائيات' }
      ];
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Product Catalog</h1>
          <p className="text-slate-400">Browse our full range of industrial and B2B supply products.</p>
        </div>
        <CatalogClient initialProducts={products} categories={categories} />
      </main>
    </div>
  );
}
