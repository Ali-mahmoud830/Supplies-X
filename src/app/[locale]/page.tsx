import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Box, ShieldCheck, Globe, Download, Award, CheckCircle, PackageSearch, Layers, Settings, ShieldAlert, Briefcase, TrendingDown, Target, Building2, Anchor } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative z-10 flex flex-col">
        {/* COMPREHENSIVE HERO SECTION RECONSTRUCTION (The 60/40 Split Grid) */}
        <div className="w-full bg-slate-50 border-b border-slate-100 relative overflow-hidden">
          {/* Engineering Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Column 1 (Left Side - 6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                  <ShieldCheck className="me-2 h-4 w-4 text-blue-600" />
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
                      {t('browse')} <ArrowRight className="ms-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border border-slate-200 hover:bg-white text-slate-700 font-medium bg-white/50 backdrop-blur-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      {t('request')}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Column 2 (Right Side - 6 cols) Glassmorphic B2B Dashboard Mockup */}
              <div className="lg:col-span-6 relative lg:ms-8 mt-12 lg:mt-0">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full translate-x-4 translate-y-4 -z-10" />
                
                <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Target className="h-48 w-48 text-blue-600" />
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-slate-200/50 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg">
                        <TrendingDown className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">{t('dashTitle', { defaultMessage: 'Procurement Dashboard' })}</h3>
                        <p className="text-xs text-slate-500 font-medium">{t('dashSub', { defaultMessage: 'Live Supply Chain Metrics' })}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{t('dashStatus', { defaultMessage: 'Active' })}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Mock RFQ Line */}
                    <div className="bg-white/60 hover:bg-white/90 border border-slate-100 rounded-xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <Settings className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{t('dashItem1', { defaultMessage: 'MRO Spare Parts PO' })}</h4>
                          <p className="text-xs text-slate-500">ID: RFQ-8821 • {t('approved', { defaultMessage: 'Approved' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-slate-900">$12,450</span>
                        <span className="text-xs text-blue-600 font-semibold">In Transit</span>
                      </div>
                    </div>
                    
                    {/* Mock Safety Line */}
                    <div className="bg-white/60 hover:bg-white/90 border border-slate-100 rounded-xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                          <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{t('dashItem2', { defaultMessage: 'Q3 PPE Allocation' })}</h4>
                          <p className="text-xs text-slate-500">ID: RFQ-8902 • {t('processing', { defaultMessage: 'Processing' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-slate-900">$8,200</span>
                        <span className="text-xs text-orange-600 font-semibold">Packaging</span>
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

        {/* COMPREHENSIVE SERVICES SECTION */}
        <div className="w-full bg-white py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{t('servicesTitle', { defaultMessage: 'Comprehensive Supply Solutions' })}</h2>
              <p className="text-lg text-slate-500 font-medium">{t('servicesSubtitle', { defaultMessage: 'Scalable corporate procurement covering all facets of industrial and structural operations.' })}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                  <Settings className="h-32 w-32 text-blue-600" />
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
                  <ShieldAlert className="h-32 w-32 text-blue-600" />
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
                  <Briefcase className="h-32 w-32 text-blue-600" />
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
        <div className="w-full bg-slate-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">{t('portBadge', { defaultMessage: 'Institutional Trust' })}</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">{t('portTitle', { defaultMessage: 'Corporate Project Fulfillment' })}</h2>
              </div>
              <p className="text-slate-400 font-medium max-w-sm md:text-right">
                {t('portSubtitle', { defaultMessage: 'Powering Egypt\'s mega-projects with uncompromised supply chain reliability.' })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project 1 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-400 transition-colors">
                  <Building2 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('prj1Title', { defaultMessage: 'New Capital Logistics Hub' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj1Desc', { defaultMessage: 'Successfully supplied 15,000+ units of certified safety gear and structural tools to Tier-1 construction contractors.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-400">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4" />
                </div>
              </div>
              
              {/* Project 2 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-400 transition-colors">
                  <Settings className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('prj2Title', { defaultMessage: '6th of October Industrial Complex' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj2Desc', { defaultMessage: 'Configured a full MRO spare-parts supply chain pipeline for a leading food production facility, reducing downtime by 22%.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-400">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4" />
                </div>
              </div>
              
              {/* Project 3 */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-400 transition-colors">
                  <Anchor className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('prj3Title', { defaultMessage: 'Alexandria Port Infrastructure' })}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                  {t('prj3Desc', { defaultMessage: 'Delivered heavy-duty electrical and marine-grade wiring components under strict maritime safety compliance.' })}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-400">
                  {t('viewCase', { defaultMessage: 'View Case Study' })} <ArrowRight className="ms-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
