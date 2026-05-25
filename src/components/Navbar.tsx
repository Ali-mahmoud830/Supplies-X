'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Globe } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">BX</div>
            <span className="font-bold text-xl tracking-wide">Supplies X</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">{t('home')}</Link>
            <Link href="/catalog" className="text-gray-700 hover:text-blue-600 font-medium">{t('catalog')}</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">{t('about')}</Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('ar')}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {t('quoteList')}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
