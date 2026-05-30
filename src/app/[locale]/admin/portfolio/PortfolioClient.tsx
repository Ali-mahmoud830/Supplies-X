'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PortfolioClient({ initialData }: { initialData: any[] }) {
  const [formData, setFormData] = useState({ nameEn: '', nameAr: '', locationEn: '', locationAr: '', metricsEn: '', metricsAr: '' });
  const [projects, setProjects] = useState(initialData);
  const router = useRouter();

  const add = async () => {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const newProj = await res.json();
      setProjects([newProj, ...projects]);
      setFormData({ nameEn: '', nameAr: '', locationEn: '', locationAr: '', metricsEn: '', metricsAr: '' });
      router.refresh();
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete project?')) return;
    await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 max-w-4xl bg-white p-6 rounded-lg shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Name (EN)</label><Input value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} /></div>
        <div><label className="text-sm font-medium">Name (AR)</label><Input value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} dir="rtl" /></div>
        <div><label className="text-sm font-medium">Location (EN)</label><Input value={formData.locationEn} onChange={e => setFormData({...formData, locationEn: e.target.value})} /></div>
        <div><label className="text-sm font-medium">Location (AR)</label><Input value={formData.locationAr} onChange={e => setFormData({...formData, locationAr: e.target.value})} dir="rtl" /></div>
        <div className="col-span-2"><label className="text-sm font-medium">Description (EN)</label><Input value={formData.metricsEn} onChange={e => setFormData({...formData, metricsEn: e.target.value})} /></div>
        <div className="col-span-2"><label className="text-sm font-medium">Description (AR)</label><Input value={formData.metricsAr} onChange={e => setFormData({...formData, metricsAr: e.target.value})} dir="rtl" /></div>
        <div className="col-span-2"><Button onClick={add} className="w-full">Add Project</Button></div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="font-medium">{p.nameEn}</div>
                  <div className="text-sm text-slate-500" dir="rtl">{p.nameAr}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{p.locationEn}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => remove(p.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
