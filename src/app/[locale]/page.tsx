import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Link } from '@/i18n/routing';
import { ArrowRight, Shield, Globe, Zap, Award, ChevronRight } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  const features = [
    {
      icon: Shield,
      title: 'Certified Quality',
      titleAr: 'جودة معتمدة',
      desc: 'ISO 9001:2015 certified products across all categories.',
      descAr: 'منتجات معتمدة وفق معايير الجودة الدولية.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Globe,
      title: 'Global Sourcing',
      titleAr: 'مصادر عالمية',
      desc: 'Direct partnerships with 200+ trusted global manufacturers.',
      descAr: 'شراكات مباشرة مع أكثر من 200 مصنع عالمي موثوق.',
      color: 'from-blue-500/20 to-blue-500/5',
      border: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      titleAr: 'تسليم سريع',
      desc: 'Dedicated procurement team with 24hr quote guarantee.',
      descAr: 'فريق مشتريات متخصص وضمان عرض سعر خلال 24 ساعة.',
      color: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Products', labelAr: 'منتج' },
    { value: '200+', label: 'Brands', labelAr: 'علامة تجارية' },
    { value: '50+', label: 'Countries', labelAr: 'دولة' },
    { value: '24/7', label: 'Support', labelAr: 'دعم متواصل' },
  ];

  const certifications = [
    { code: 'ISO 9001', label: 'Quality Management' },
    { code: 'OSHA', label: 'Safety Standards' },
    { code: 'CE Mark', label: 'European Conformity' },
    { code: 'SASO', label: 'Saudi Standards' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden flex-1 flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-600/15 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-900/10 rounded-full filter blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium tracking-wide">Trusted B2B Procurement Partner</span>
            </div>

            {/* Glassmorphism hero card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent mb-6">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
                {t('description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalog">
                  <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                    Browse Catalog
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/cart">
                  <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105">
                    Request a Quote
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/5 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Supplies X?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Built for enterprise procurement teams that demand reliability, speed, and quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group relative bg-gradient-to-br ${feature.color} border ${feature.border} rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-default`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6 ${feature.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE DASHBOARD ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-sm tracking-wide uppercase">Compliance &amp; Certifications</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Globally Certified Standards</h2>
                <p className="text-slate-400 max-w-md">All products are sourced and verified against international compliance benchmarks.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.code}
                    className="flex flex-col items-center bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200 rounded-xl px-6 py-4 min-w-[100px]"
                  >
                    <span className="text-white font-bold text-lg">{cert.code}</span>
                    <span className="text-slate-500 text-xs mt-1 text-center">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-slate-950 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">BX</div>
            <span className="text-white font-semibold">Supplies X</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Supplies X. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
            <Link href="/cart" className="hover:text-white transition-colors">Request Quote</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
