import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, MessageCircle, FileText, Globe } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          
          {/* Brand & Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                BX
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Supplies <span className="text-blue-500">X</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {t('brandDesc', { defaultMessage: 'Your trusted enterprise partner for certified industrial tools, safety gear, and corporate procurement contracts.' })}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Globe className="h-4 w-4" />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors border border-slate-800">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">{t('quickLinks', { defaultMessage: 'Quick Links' })}</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/catalog" className="hover:text-blue-400 transition-colors">{t('catalog', { defaultMessage: 'Product Catalog' })}</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400 transition-colors">{t('requestQuote', { defaultMessage: 'Request a Quote' })}</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">{t('aboutUs', { defaultMessage: 'About Us' })}</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400 transition-colors">{t('compliance', { defaultMessage: 'Compliance & Quality' })}</Link></li>
            </ul>
          </div>

          {/* Corporate Details */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">{t('corporateInfo', { defaultMessage: 'Corporate Info' })}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3 items-start">
                <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <div className="text-slate-200">Commercial Registration</div>
                  <div className="text-slate-500 text-xs mt-0.5">C.R. No. 1029384756</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <div className="text-slate-200">Tax ID</div>
                  <div className="text-slate-500 text-xs mt-0.5">XXX-XXX-XXX</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">{t('contactUs', { defaultMessage: 'Head Office' })}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span>
                  Business District, Building 14<br />
                  Cairo, Egypt
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <span>+20 2 1234 5678</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <span>procurement@supplies-x.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} Supplies X. {t('allRightsReserved', { defaultMessage: 'All rights reserved.' })}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('privacy', { defaultMessage: 'Privacy Policy' })}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('terms', { defaultMessage: 'Terms of Service' })}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
