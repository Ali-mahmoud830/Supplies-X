'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_ar: z.string().min(1, 'Arabic title is required'),
  desc_en: z.string().min(1, 'English description is required'),
  desc_ar: z.string().min(1, 'Arabic description is required'),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  origin: z.string().optional(),
});

type Product = any;
type Category = any;

export default function ProductsClient({ initialData, categories }: { initialData: Product[], categories: Category[] }) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title_en: '', title_ar: '', desc_en: '', desc_ar: '', categoryId: '', brand: '', origin: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, images: [], specifications: {} }),
      });
      if (res.ok) {
        setIsOpen(false);
        form.reset();
        router.refresh(); // Rely on refresh to fetch new data via server component
      }
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1 space-y-4 mt-4">
                  <FormField control={form.control} name="title_en" render={({ field }) => (
                    <FormItem><FormLabel>Title (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="desc_en" render={({ field }) => (
                    <FormItem><FormLabel>Description (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                
                <div className="col-span-2 md:col-span-1 space-y-4">
                  <FormField control={form.control} name="title_ar" render={({ field }) => (
                    <FormItem><FormLabel>Title (AR)</FormLabel><FormControl><Input {...field} dir="rtl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="desc_ar" render={({ field }) => (
                    <FormItem><FormLabel>Description (AR)</FormLabel><FormControl><Input {...field} dir="rtl" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="col-span-2">
                  <FormField control={form.control} name="categoryId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name_en}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="brand" render={({ field }) => (
                  <FormItem><FormLabel>Brand (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="origin" render={({ field }) => (
                  <FormItem><FormLabel>Origin (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="col-span-2">
                  <Button type="submit" className="w-full">Save Product</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title (EN/AR)</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand / Origin</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>
                  <div className="font-medium">{prod.title_en}</div>
                  <div className="text-sm text-slate-500" dir="rtl">{prod.title_ar}</div>
                </TableCell>
                <TableCell><Badge variant="secondary">{prod.category?.name_en}</Badge></TableCell>
                <TableCell>
                  <div className="text-sm">{prod.brand || '-'}</div>
                  <div className="text-xs text-slate-500">{prod.origin || '-'}</div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="destructive" size="sm" onClick={() => deleteProduct(prod.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {initialData.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-4">No products found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
