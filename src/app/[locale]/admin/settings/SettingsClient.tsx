'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData || { 
    statsProducts: '50k+', 
    statsBrands: '200+', 
    statsCountries: '15+', 
    statsSupport: '24/7',
    addressEn: 'Cairo, Egypt',
    addressAr: 'القاهرة، مصر',
    phone: '+20 123 456 7890',
    email: 'info@suppliesx.com',
    taxId: '123-456-789'
  });
  const router = useRouter();

  const save = async () => {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    router.refresh();
    alert('Settings updated successfully!');
  };

  return (
    <div className="space-y-8 max-w-3xl w-full bg-white p-4 md:p-6 rounded-lg shadow-sm border border-slate-200">
      
      <div>
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Dynamic Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Products Stat</label><Input value={formData.statsProducts} onChange={e => setFormData({...formData, statsProducts: e.target.value})} /></div>
          <div><label className="text-sm font-medium">Brands Stat</label><Input value={formData.statsBrands} onChange={e => setFormData({...formData, statsBrands: e.target.value})} /></div>
          <div><label className="text-sm font-medium">Countries Stat</label><Input value={formData.statsCountries} onChange={e => setFormData({...formData, statsCountries: e.target.value})} /></div>
          <div><label className="text-sm font-medium">Support Stat</label><Input value={formData.statsSupport} onChange={e => setFormData({...formData, statsSupport: e.target.value})} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Corporate Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Address (EN)</label><Input value={formData.addressEn} onChange={e => setFormData({...formData, addressEn: e.target.value})} /></div>
          <div><label className="text-sm font-medium">Address (AR)</label><Input value={formData.addressAr} onChange={e => setFormData({...formData, addressAr: e.target.value})} dir="rtl" /></div>
          <div><label className="text-sm font-medium">Phone</label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} dir="ltr" /></div>
          <div><label className="text-sm font-medium">Email</label><Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
          <div className="sm:col-span-2"><label className="text-sm font-medium">Tax ID</label><Input value={formData.taxId} onChange={e => setFormData({...formData, taxId: e.target.value})} /></div>
        </div>
      </div>

      <Button onClick={save} className="w-full h-12 text-md font-bold">Save All Settings</Button>
    </div>
  );
}
