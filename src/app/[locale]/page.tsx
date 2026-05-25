import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Box, ShieldCheck, Globe, Download, Award, CheckCircle } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative z-10">
        {/* Clean Corporate Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 p-8 sm:p-0">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
              <ShieldCheck className="mr-2 h-4 w-4 text-blue-600" />
              {t('trusted')}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {t('title').split('B2B')[0]}
              <span className="text-blue-600">B2B</span>
              {t('title').split('B2B')[1]}
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/catalog">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all">
                  {t('browse')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-slate-300 hover:bg-slate-100 text-slate-700 font-medium bg-white">
                  {t('request')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            <div className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Box className="h-10 w-10 text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-1">50k+</div>
              <div className="text-slate-500 font-medium">{t('stats.products')}</div>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 translate-y-8">
              <Award className="h-10 w-10 text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-1">200+</div>
              <div className="text-slate-500 font-medium">{t('stats.brands')}</div>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <Globe className="h-10 w-10 text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-1">15+</div>
              <div className="text-slate-500 font-medium">{t('stats.countries')}</div>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 translate-y-8">
              <ShieldCheck className="h-10 w-10 text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-slate-900 mb-1">24/7</div>
              <div className="text-slate-500 font-medium">{t('stats.support')}</div>
            </div>
          </div>
        </div>

        {/* Compliance & Accreditation Counter */}
        <div className="border-y border-slate-200 bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 mb-4 border border-slate-200">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" /> {t('complianceBadge')}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('complianceTitle')}</h2>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                  {t('complianceDesc')}
                </p>
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 w-full sm:w-auto shadow-sm transition-all font-medium">
                  <Download className="mr-2 h-4 w-4" /> {t('downloadProfile')}
                </Button>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 border border-slate-200 shadow-sm">
                    <span className="font-bold text-slate-700 text-lg">ISO</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">9001:2015</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 border border-slate-200 shadow-sm">
                    <span className="font-bold text-slate-700 text-lg">OSHA</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">COMPLIANT</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 border border-slate-200 shadow-sm">
                    <span className="font-bold text-slate-700 text-lg">CE</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">CERTIFIED</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 border border-slate-200 shadow-sm">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {t('footerRights')}</p>
        </div>
      </footer>
    </div>
  );
}
