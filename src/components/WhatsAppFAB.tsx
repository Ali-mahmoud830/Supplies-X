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
      className="fixed bottom-6 end-6 md:bottom-8 md:end-8 z-50 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="font-semibold text-sm md:text-base tracking-wide hidden sm:block">
        {locale === 'ar' ? '💬 تحدث مع أخصائي المشتريات' : '💬 Talk to a B2B Procurement Specialist'}
      </span>
    </a>
  );
}
