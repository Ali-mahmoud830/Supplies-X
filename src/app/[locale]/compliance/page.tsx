import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Corporate Compliance & Quality</h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Supplies X adheres to the strictest global standards, including ISO 9001:2015, OSHA Safety Protocols, and CE Enterprise Certifications for high-ticket industrial operations.
          </p>
          <div className="h-64 w-full bg-slate-200 rounded-2xl border border-slate-300 flex items-center justify-center text-slate-400 font-medium">
            Compliance Certifications Coming Soon
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
