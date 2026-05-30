import { getTranslations, getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Box, ShieldCheck, Globe, Download, Award, CheckCircle, PackageSearch, Layers, Settings, ShieldAlert, Briefcase, TrendingDown, Target, Building2, Anchor, MapPin, Truck } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  const locale = await getLocale();
  
  let dbHero = null;
  let dbServices: any[] = [];
  let dbProjects: any[] = [];
  let dbSettings = null;
  
  try {
    dbHero = await prisma.heroContent.findFirst();
    dbServices = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 4 });
    dbSettings = await prisma.settings.findFirst();
  } catch(e) {
    console.error('DB Fetch Error', e);
  }

  const titleText = locale === 'ar' ? (dbHero?.titleAr || t('title')) : (dbHero?.titleEn || t('title'));
  const subText = locale === 'ar' ? (dbHero?.subAr || t('description')) : (dbHero?.subEn || t('description'));
  const heroBg = dbHero?.bgImageUrl || "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative z-10 flex flex-col">
        {/* CINEMATIC INDUSTRIAL HERO SECTION */}
        <div className="w-full relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[80vh]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Industrial Warehouse Background" 
              className="w-full h-full object-cover" 
            />
            {/* Dark Overlay for OmniCare contrast */}
            <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-white shadow-sm mb-8">
              <ShieldCheck className="me-2 h-4 w-4 text-amber-400" />
              {t('trusted')}
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
              {titleText}
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed font-medium max-w-3xl mb-10">
              {subText}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  {t('browse')} <ArrowRight className="ms-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 border border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white font-bold transition-all duration-300 hover:scale-[1.02]">
                  {t('request')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* THE FLOATING TRUST BAR (OmniCare Style) */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 mb-10">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{t('trustBar.certified', { defaultMessage: 'Certified & Vetted Equipment' })}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                <Truck className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{t('trustBar.availability', { defaultMessage: '24/7 Supply Chain Availability' })}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{t('trustBar.quality', { defaultMessage: 'Institutional Quality Assurance' })}</span>
            </div>
          </div>
        </div>

        {/* MINI-METRICS ROW (Clean Compact Stats) */}
        <div className="w-full bg-white border-b border-slate-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{dbSettings?.statsProducts || '50k+'}</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.products')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{dbSettings?.statsBrands || '200+'}</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.brands')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{dbSettings?.statsCountries || '15+'}</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.countries')}</span>
              </div>
              <div className="flex flex-col px-4 text-center sm:text-left">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{dbSettings?.statsSupport || '24/7'}</span>
                <span className="text-slate-500 text-sm font-medium mt-1">{t('stats.support')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE SERVICES SECTION */}
        <div className="w-full bg-white py-24 md:py-32 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{t('servicesTitle', { defaultMessage: 'Comprehensive Supply Solutions' })}</h2>
              <p className="text-lg text-slate-500 font-medium">{t('servicesSubtitle', { defaultMessage: 'Scalable corporate procurement covering all facets of industrial and structural operations.' })}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                  <Settings className="h-32 w-32 text-amber-500" />
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 border border-amber-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Settings className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{t('srv1Title', { defaultMessage: 'MRO Supply Chain Management' })}</h3>
                <p className="text-slate-600 font-medium leading-relaxed relative z-10">
                  {t('srv1Desc', { defaultMessage: 'Industrial tools, machinery spare parts, electrical, and plumbing components with automated restocking.' })}
                </p>
              </div>
              
              {/* Service 2 */}
              <div className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                  <ShieldAlert className="h-32 w-32 text-amber-500" />
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 border border-amber-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <ShieldAlert className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{t('srv2Title', { defaultMessage: 'PPE & Occupational Safety Compliance' })}</h3>
                <p className="text-slate-600 font-medium leading-relaxed relative z-10">
                  {t('srv2Desc', { defaultMessage: 'Head-to-toe certified personal protective equipment, fire safety systems, and site safety signage complying with OSHA & CE standards.' })}
                </p>
              </div>
              
              {/* Service 3 */}
              <div className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                  <Briefcase className="h-32 w-32 text-amber-500" />
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 border border-amber-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{t('srv3Title', { defaultMessage: 'Bulk Corporate Procurement Contracts' })}</h3>
                <p className="text-slate-600 font-medium leading-relaxed relative z-10">
                  {t('srv3Desc', { defaultMessage: 'Customized annual supply contracts, volume-based pricing, and dedicated account managers for factories and construction firms.' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PORTFOLIO & PROJECT SUCCESS SECTION */}
        <div className="w-full bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.10),rgba(255,255,255,0))]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-2 block">{t('portBadge', { defaultMessage: 'Institutional Trust' })}</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">{t('portTitle', { defaultMessage: 'Corporate Project Fulfillment' })}</h2>
              </div>
              <p className="text-slate-400 font-medium max-w-sm md:text-right">
                {t('portSubtitle', { defaultMessage: 'Powering Egypt\'s mega-projects with uncompromised supply chain reliability.' })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 border border-amber-500/20 group-hover:border-amber-400 transition-colors">
                  <Building2 className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('prj1Loc', { defaultMessage: 'New Administrative Capital' })}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('prj1Title', { defaultMessage: 'New Capital Logistics Hub' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj1Desc', { defaultMessage: 'Successfully supplied 15,000+ units of certified safety gear and structural tools to Tier-1 construction contractors.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Project 2 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 border border-amber-500/20 group-hover:border-amber-400 transition-colors">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('prj2Loc', { defaultMessage: '6th of October City' })}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('prj2Title', { defaultMessage: '6th of October Industrial Complex' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj2Desc', { defaultMessage: 'Configured a full MRO spare-parts supply chain pipeline for a leading food production facility, reducing downtime by 22%.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Project 3 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 border border-amber-500/20 group-hover:border-amber-400 transition-colors">
                  <Anchor className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('prj3Loc', { defaultMessage: 'Alexandria' })}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('prj3Title', { defaultMessage: 'Alexandria Port Infrastructure' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj3Desc', { defaultMessage: 'Delivered heavy-duty electrical and marine-grade wiring components under strict maritime safety compliance.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 py-24 md:py-32 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              
              <div className="lg:w-1/3">
                <div className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 mb-6 border border-slate-200 shadow-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-amber-500" /> {t('complianceBadge')}
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
                  <a href="#" className="text-[10px] text-amber-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xl">OSHA</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Compliant</span>
                  <a href="#" className="text-[10px] text-amber-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <span className="font-extrabold text-slate-900 text-xl">CE</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Certified</span>
                  <a href="#" className="text-[10px] text-amber-600 hover:underline">Verify Certification Credential</a>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 group-hover:border-blue-200 transition-colors">
                    <ShieldCheck className="h-8 w-8 text-amber-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">Verified</span>
                  <a href="#" className="text-[10px] text-amber-600 hover:underline">Verify Certification Credential</a>
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
