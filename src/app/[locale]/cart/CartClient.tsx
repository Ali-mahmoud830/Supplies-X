'use client';

import { useState, useCallback } from 'react';
import { useCartStore } from '@/lib/cart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, UploadCloud, CheckCircle2 } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

const schema = z.object({
  client_name: z.string().min(1, 'Name is required'),
  company_name: z.string().optional(),
  commercial_registration: z.string().optional(),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Valid phone number is required'),
  attached_file_url: z.string().optional(),
});

export default function CartClient({ initialProducts = [] }: { initialProducts?: any[] }) {
  const cart = useCartStore();
  const router = useRouter();
  const t = useTranslations('Cart');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Bulk Pad State
  const [bulkText, setBulkText] = useState('');
  
  // Dropzone State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { client_name: '', company_name: '', commercial_registration: '', email: '', phone: '', attached_file_url: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (cart.items.length === 0) return alert(t('emptyTitle'));
    setIsSubmitting(true);
    
    try {
      const items = cart.items.map((i) => ({ productId: i.product.id, quantity: i.quantity }));
      const payload = { ...values, items };

      const res = await fetch('/api/rfqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        cart.clearCart();
        alert(t('success'));
        router.push('/');
      } else {
        alert(t('error'));
      }
    } catch (error) {
      console.error(error);
      alert(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkAdd = () => {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l);
    let addedCount = 0;
    
    lines.forEach(line => {
      // Very basic matching logic for B2B Scratch Pad
      const match = initialProducts.find(p => 
        p.id === line || 
        p.title_en.toLowerCase() === line.toLowerCase() || 
        p.title_ar === line
      );
      if (match) {
        cart.addItem(match, 1);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      setBulkText('');
      alert(`Successfully added ${addedCount} items to your quote list.`);
    } else {
      alert('No matching products found for the provided input.');
    }
  };

  // Mock Dropzone Handlers
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  }, []);

  const simulateUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('success');
      form.setValue('attached_file_url', 'https://storage.supplies-x.com/mock-upload-sheet.xlsx');
    }, 2000);
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('emptyTitle')}</h2>
        <p className="text-slate-500 mb-6">{t('emptySub')}</p>
        <Link href="/catalog">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">{t('browse')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Cart Items & Bulk Pad */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Bulk RFQ Scratch Pad */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-2 text-slate-900">{t('bulkPadTitle')}</h2>
          <p className="text-sm text-slate-500 mb-4">{t('bulkPadDesc')}</p>
          <Textarea 
            placeholder={t('bulkPadPlaceholder')}
            className="min-h-[120px] mb-4 bg-slate-50 font-mono text-sm"
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
          />
          <Button 
            onClick={handleBulkAdd} 
            disabled={!bulkText.trim()}
            variant="secondary"
            className="w-full font-medium"
          >
            {t('bulkPadBtn')}
          </Button>
        </div>

        {/* Cart Items Table */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-4">{t('selected')}</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('product')}</TableHead>
                  <TableHead className="text-center">{t('quantity')}</TableHead>
                  <TableHead className="text-right">{t('remove')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.product.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-md border border-slate-100" />
                        )}
                        <div>
                          <div className="font-medium text-slate-900 line-clamp-1">{locale === 'en' ? item.product.title_en : item.product.title_ar}</div>
                          <div className="text-xs text-slate-500" dir={locale === 'en' ? 'rtl' : 'ltr'}>
                            {locale === 'en' ? item.product.title_ar : item.product.title_en}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 bg-slate-50 rounded-md p-1 border border-slate-200">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => cart.updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>-</Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}>+</Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => cart.removeItem(item.product.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Right Column: Checkout Form & Dropzone */}
      <div className="bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-6">{t('details')}</h2>
        
        {/* File Dropzone */}
        <div className="mb-6">
          <label className="text-sm font-medium leading-none mb-2 block">{t('dropzoneTitle')}</label>
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => uploadState === 'idle' && simulateUpload()}
            className={`
              relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}
              ${uploadState === 'success' ? 'border-green-500 bg-green-50' : ''}
            `}
          >
            {uploadState === 'idle' && (
              <>
                <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 font-medium">Upload your internal RFQ or Bill of Materials (BOM) Excel sheet</p>
                <p className="text-xs text-slate-400 mt-1">{t('dropzoneDesc')}</p>
              </>
            )}
            {uploadState === 'uploading' && (
              <>
                <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2" />
                <p className="text-sm text-blue-600 font-medium">{t('dropzoneMock')}</p>
              </>
            )}
            {uploadState === 'success' && (
              <>
                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-green-600 font-medium">{t('dropzoneSuccess')}</p>
              </>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="client_name" render={({ field }) => (
              <FormItem><FormLabel>{t('name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="company_name" render={({ field }) => (
              <FormItem><FormLabel>{t('company')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="commercial_registration" render={({ field }) => (
              <FormItem><FormLabel>{t('cr_number')}</FormLabel><FormControl><Input {...field} placeholder="Optional" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>{t('email')}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>{t('phone')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="attached_file_url" render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>{t('fileLabel')}</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-md" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
              <p className="text-xs text-slate-500 mt-4 text-center">
                {t('disclaimer')}
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
