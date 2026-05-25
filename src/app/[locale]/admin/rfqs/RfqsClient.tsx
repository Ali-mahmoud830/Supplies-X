'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type RFQ = any;

const statusColors: Record<string, string> = {
  Pending: 'bg-orange-100 text-orange-800',
  Reviewing: 'bg-blue-100 text-blue-800',
  Priced: 'bg-purple-100 text-purple-800',
  Completed: 'bg-green-100 text-green-800',
};

export default function RfqsClient({ initialData }: { initialData: RFQ[] }) {
  const [rfqs, setRfqs] = useState<RFQ[]>(initialData);
  const router = useRouter();

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/rfqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="bg-white rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((rfq) => (
            <TableRow key={rfq.id}>
              <TableCell>
                <div className="font-medium">{rfq.client_name}</div>
                <div className="text-sm text-slate-500">{rfq.company_name || '-'}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{rfq.email}</div>
                <div className="text-xs text-slate-500">{rfq.phone}</div>
              </TableCell>
              <TableCell className="text-sm">
                {new Date(rfq.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={rfq.status}
                  onValueChange={(val) => updateStatus(rfq.id, val)}
                >
                  <SelectTrigger className={`w-[130px] h-8 text-xs font-semibold ${statusColors[rfq.status] || ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewing">Reviewing</SelectItem>
                    <SelectItem value="Priced">Priced</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">View Items</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>RFQ Items Requested</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-3">
                      {rfq.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between border-b pb-2">
                          <span className="font-medium">{item.product.title_en}</span>
                          <span className="text-slate-600">Qty: {item.quantity}</span>
                        </div>
                      ))}
                      {rfq.attached_file_url && (
                        <div className="pt-4">
                          <a href={rfq.attached_file_url} target="_blank" className="text-blue-600 underline text-sm">
                            View Attached Document
                          </a>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
          {initialData.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center py-4">No RFQs found.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
