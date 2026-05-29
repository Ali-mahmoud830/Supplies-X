'use client';

import { MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

export function WhatsAppFAB() {
  const locale = useLocale();
  const phoneNumber = '1234567890'; // Replace with actual WhatsApp number
  const messageEn = 'Hello, I am interested in exploring your enterprise procurement and supply options.';
  const messageAr = 'مرحباً، أود الاستفسار عن خيارات التوريد والمشتريات لشركتي.';
  
  const text = locale === 'ar' ? messageAr : messageEn;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 end-6 md:bottom-8 md:end-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute end-full me-4 bg-white text-slate-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        {locale === 'ar' ? 'تواصل معنا' : 'Chat with Sales'}
      </span>
    </a>
  );
}
