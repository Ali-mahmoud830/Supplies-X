import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Box, ShieldCheck, Globe, Download, Award, CheckCircle, PackageSearch, Layers } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative z-10 flex flex-col">
        {/* COMPREHENSIVE HERO SECTION RECONSTRUCTION (The 60/40 Split Grid) */}
        <div className="w-full bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Column 1 (Left Side - 7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                  <ShieldCheck className="mr-2 h-4 w-4 text-blue-600" />
                  {t('trusted')}
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
                  {t('title').split('B2B')[0]}
                  <span className="text-blue-600 block sm:inline mt-2 sm:mt-0">B2B </span>
                  {t('title').split('B2B')[1]}
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-2xl">
                  {t('description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/catalog">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/10 transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5">
                      {t('browse')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium bg-white transition-all hover:shadow-md hover:-translate-y-0.5">
                      {t('request')}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Column 2 (Right Side - 5 cols) Premium B2B Imagery Module */}
              <div className="lg:col-span-5 relative">
                {/* Decorative structural frame */}
                <div className="absolute inset-0 bg-blue-600/5 rounded-2xl translate-x-4 translate-y-4 -z-10" />
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 h-[450px] flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Layers className="h-48 w-48 text-blue-600" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                        <PackageSearch className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Industrial Supply Network</h3>
                        <p className="text-xs text-slate-500 font-medium">Enterprise Procurement Hub</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Mocked stacked product graphics */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                          <Box className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                          <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 delay-75 group-hover:-translate-y-1 group-hover:shadow-md">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                          <ShieldCheck className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-2/3 bg-slate-200 rounded mb-2" />
                          <div className="h-3 w-1/3 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 delay-150 group-hover:-translate-y-1 group-hover:shadow-md">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                          <Globe className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 bg-slate-200 rounded mb-2" />
                          <div className="h-3 w-2/5 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MINI-METRICS ROW (Clean Compact Stats) */}
        <div className="w-full bg-white border-b border-slate-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">50k+</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.products')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">200+</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.brands')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">15+</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.countries')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">24/7</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.support')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODERN CARDS & TRUST BOARD REFACTORING */}
        <div className="bg-slate-50 py-20 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              
              <div className="lg:w-1/3">
                <div className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 mb-6 border border-slate-200 shadow-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-blue-600" /> {t('complianceBadge')}
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {t('complianceTitle')}
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium text-lg">
                  {t('complianceDesc')}
                </p>
                <a href="/company-profile.pdf" download="Supplies_X_Corporate_Profile.pdf">
                  <Button variant="outline" className="border-slate-200 hover:bg-white text-slate-700 shadow-sm transition-all font-medium h-12 px-6 w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" /> {t('downloadProfile')}
                  </Button>
                </a>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xl">ISO</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">9001:2015</span>
                  <a href="#" className="text-[10px] text-blue-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xl">OSHA</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Compliant</span>
                  <a href="#" className="text-[10px] text-blue-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xl">CE</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Certified</span>
                  <a href="#" className="text-[10px] text-blue-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Verified</span>
                  <a href="#" className="text-[10px] text-blue-600 hover:underline">Verify Certification Credential</a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
