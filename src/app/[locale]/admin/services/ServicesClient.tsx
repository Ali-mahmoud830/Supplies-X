'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ServicesClient({ initialData }: { initialData: any[] }) {
  const [formData, setFormData] = useState({ titleEn: '', titleAr: '', descEn: '', descAr: '', icon: '' });
  const [services, setServices] = useState(initialData);
  const router = useRouter();

  const add = async () => {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const newService = await res.json();
      setServices([...services, newService]);
      setFormData({ titleEn: '', titleAr: '', descEn: '', descAr: '', icon: '' });
      router.refresh();
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(services.filter(s => s.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 max-w-4xl bg-white p-6 rounded-lg shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Title (EN)</label><Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} /></div>
        <div><label className="text-sm font-medium">Title (AR)</label><Input value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} dir="rtl" /></div>
        <div className="col-span-2"><label className="text-sm font-medium">Desc (EN)</label><Input value={formData.descEn} onChange={e => setFormData({...formData, descEn: e.target.value})} /></div>
        <div className="col-span-2"><label className="text-sm font-medium">Desc (AR)</label><Input value={formData.descAr} onChange={e => setFormData({...formData, descAr: e.target.value})} dir="rtl" /></div>
        <div className="col-span-2"><Button onClick={add} className="w-full">Add Service</Button></div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title (EN/AR)</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="font-medium">{s.titleEn}</div>
                  <div className="text-sm text-slate-500" dir="rtl">{s.titleAr}</div>
                </TableCell>
                <TableCell><div className="text-sm truncate max-w-xs">{s.descEn}</div></TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => remove(s.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
