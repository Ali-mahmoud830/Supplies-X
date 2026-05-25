import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Box, ShieldCheck, Globe, Download, Award, CheckCircle } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Floating Neon Ambient Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-emerald-600/10 to-transparent rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-600/20 via-blue-600/10 to-transparent rounded-full blur-[120px] animate-pulse translate-x-1/3 translate-y-1/3" />
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        {/* Premium Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 backdrop-blur-sm p-8 rounded-3xl border border-white/5 bg-white/5 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-md">
              <ShieldCheck className="mr-2 h-4 w-4" />
              {t('trusted')}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-lg">
              {t('title').split('B2B')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">B2B</span>
              {t('title').split('B2B')[1]}
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/catalog">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500/50">
                  {t('browse')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/20 hover:bg-white/10 text-white font-medium backdrop-blur-md">
                  {t('request')}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full" />
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <Box className="h-10 w-10 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-1">50k+</div>
              <div className="text-slate-400 font-medium">{t('stats.products')}</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl translate-y-8 hover:translate-y-6 transition-transform duration-300">
              <Award className="h-10 w-10 text-emerald-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-1">200+</div>
              <div className="text-slate-400 font-medium">{t('stats.brands')}</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <Globe className="h-10 w-10 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-1">15+</div>
              <div className="text-slate-400 font-medium">{t('stats.countries')}</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl translate-y-8 hover:translate-y-6 transition-transform duration-300">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-slate-400 font-medium">{t('stats.support')}</div>
            </div>
          </div>
        </div>

        {/* Compliance & Accreditation Counter */}
        <div className="border-y border-white/5 bg-black/40 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 mb-4 border border-emerald-500/20">
                  <CheckCircle className="mr-2 h-4 w-4" /> {t('complianceBadge')}
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{t('complianceTitle')}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {t('complianceDesc')}
                </p>
                <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                  <Download className="mr-2 h-4 w-4" /> {t('downloadProfile')}
                </Button>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center grayscale hover:grayscale-0 transition-all duration-500 cursor-default shadow-lg hover:border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-3 border border-white/5">
                    <span className="font-bold text-white text-lg">ISO</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest">9001:2015</span>
                </div>
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center grayscale hover:grayscale-0 transition-all duration-500 cursor-default shadow-lg hover:border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-3 border border-white/5">
                    <span className="font-bold text-white text-lg">OSHA</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest">COMPLIANT</span>
                </div>
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center grayscale hover:grayscale-0 transition-all duration-500 cursor-default shadow-lg hover:border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-3 border border-white/5">
                    <span className="font-bold text-white text-lg">CE</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest">CERTIFIED</span>
                </div>
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center grayscale hover:grayscale-0 transition-all duration-500 cursor-default shadow-lg hover:border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-3 border border-white/5">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {t('footerRights')}</p>
        </div>
      </footer>
    </div>
  );
}
