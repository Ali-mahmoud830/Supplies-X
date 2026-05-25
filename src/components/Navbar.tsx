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
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/40 transition-shadow">
              BX
            </div>
            <span className="font-bold text-xl text-white tracking-tight">Supplies <span className="text-blue-400">X</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-sm">
                <Globe className="h-4 w-4" />
                <span className="uppercase font-medium">{locale}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white">
                <DropdownMenuItem onClick={() => switchLanguage('en')} className="hover:bg-white/5 cursor-pointer">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('ar')} className="hover:bg-white/5 cursor-pointer">العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quote Cart */}
            <Link href="/cart">
              <button className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">{t('quoteList')}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/5 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
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
