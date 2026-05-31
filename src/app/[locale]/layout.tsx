import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { WhatsAppFAB } from '@/components/WhatsAppFAB';
import { Toaster } from 'react-hot-toast';
import prisma from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'B2B General Supplies Platform',
  description: 'Your trusted partner for industrial tools and safety equipment.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dbSettings = await prisma.settings.findFirst();
  const phone = dbSettings?.phone || '1234567890';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? cairo.className : inter.className;

  return (
    <html lang={locale} dir={dir}>
      <body className={fontClass}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#0f172a', // slate-900
                color: '#fff',
                border: '1px solid #1e293b' // slate-800
              },
              success: {
                iconTheme: {
                  primary: '#f59e0b', // amber-500
                  secondary: '#fff',
                },
              },
            }} 
          />
          <WhatsAppFAB phone={phone} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
