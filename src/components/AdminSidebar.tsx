'use client';

import { Link, usePathname } from '@/i18n/routing';
import { LayoutDashboard, Package, Tags, FileText, Settings } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function AdminSidebar() {
  const t = useTranslations('AdminSidebar');
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const menu = [
    { name: t('dashboard'), path: '/admin', icon: LayoutDashboard },
    { name: t('categories'), path: '/admin/categories', icon: Tags },
    { name: t('products'), path: '/admin/products', icon: Package },
    { name: t('rfqs'), path: '/admin/rfqs', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 shadow-lg flex flex-col">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">BX</div>
        <h2 className="text-xl font-bold tracking-wide">Supplies X</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
