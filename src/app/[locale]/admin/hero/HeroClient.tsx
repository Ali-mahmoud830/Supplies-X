'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HeroClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData || { titleEn: '', titleAr: '', subEn: '', subAr: '', bgImageUrl: '' });
  const router = useRouter();

  const save = async () => {
    const res = await fetch('/api/hero', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) {
      toast.success('✓ Hero synchronized successfully');
      router.refresh();
    } else {
      toast.error('Failed to sync hero content');
    }
  };

  return (
    <div className="space-y-4 max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div><label className="text-sm font-medium">Title (EN)</label><Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} /></div>
      <div><label className="text-sm font-medium">Title (AR)</label><Input value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} dir="rtl" /></div>
      <div><label className="text-sm font-medium">Subtitle (EN)</label><Input value={formData.subEn} onChange={e => setFormData({...formData, subEn: e.target.value})} /></div>
      <div><label className="text-sm font-medium">Subtitle (AR)</label><Input value={formData.subAr} onChange={e => setFormData({...formData, subAr: e.target.value})} dir="rtl" /></div>
      <div><label className="text-sm font-medium">Background Image URL</label><Input value={formData.bgImageUrl} onChange={e => setFormData({...formData, bgImageUrl: e.target.value})} /></div>
      <Button onClick={save} className="w-full">Save Hero Content</Button>
    </div>
  );
}
