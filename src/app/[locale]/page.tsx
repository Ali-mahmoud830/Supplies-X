import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-blue-900 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              {t('description')}
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/catalog">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-lg px-8">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">5000+</div>
              <div className="text-gray-600 font-medium">Products in Stock</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600 font-medium">Global Brands</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 font-medium">Dedicated Support</div>
            </div>
          </div>
        </section>

        {/* Trust Certificates */}
        <section className="py-16 px-4 bg-slate-100">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Certified & Trusted</h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="h-16 w-32 bg-gray-300 rounded-md flex items-center justify-center font-bold text-gray-500">ISO 9001</div>
              <div className="h-16 w-32 bg-gray-300 rounded-md flex items-center justify-center font-bold text-gray-500">OSHA Compliant</div>
              <div className="h-16 w-32 bg-gray-300 rounded-md flex items-center justify-center font-bold text-gray-500">CE Marked</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
