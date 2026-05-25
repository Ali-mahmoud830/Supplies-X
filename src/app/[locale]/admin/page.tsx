import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FileText, CheckCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function AdminDashboard() {
  const t = await getTranslations('Admin.Overview');
  
  const [totalProducts, pendingRfqs, completedRfqs] = await Promise.all([
    prisma.product.count(),
    prisma.rFQ.count({ where: { status: 'Pending' } }),
    prisma.rFQ.count({ where: { status: 'Completed' } })
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('totalProducts')} Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t('totalProducts')}</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t('pendingRfqs')}</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRfqs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t('completedRfqs')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRfqs}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
