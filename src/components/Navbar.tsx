'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useCartStore } from '@/lib/cart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ShoppingCart, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from '@/i18n/routing';

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/catalog', label: t('catalog') },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
              BX
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Supplies <span className="text-blue-600">X</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-slate-200 text-slate-900">
                <DropdownMenuItem onClick={() => switchLanguage('en')} className="hover:bg-slate-50 cursor-pointer">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('ar')} className="hover:bg-slate-50 cursor-pointer">العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quote Cart */}
            <Link href="/cart">
              <button className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">{t('quoteList')}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2 bg-white">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
