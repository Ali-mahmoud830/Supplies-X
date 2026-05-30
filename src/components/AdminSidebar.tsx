'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { LayoutDashboard, Package, Tags, FileText, Settings, Image, Briefcase, Map, Menu, X } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not render sidebar on login page
  if (pathname.endsWith('/admin/login')) {
    return null;
  }

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Settings', path: '/admin/hero', icon: Image },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Map },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'RFQs', path: '/admin/rfqs', icon: FileText },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white min-h-screen p-4 shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center gap-3 px-2 mt-4 md:mt-0">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">BX</div>
          <h2 className="text-xl font-bold tracking-wide">Supplies X</h2>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const isActive = item.path === '/admin' ? pathname === '/admin' : pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
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
    </>
  );
}
