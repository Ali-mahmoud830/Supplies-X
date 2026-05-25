'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2 } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';

const schema = z.object({
  client_name: z.string().min(1, 'Name is required'),
  company_name: z.string().optional(),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Valid phone number is required'),
  attached_file_url: z.string().optional(), // Using a simple URL input for mock file upload
});

export default function CartClient() {
  const cart = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { client_name: '', company_name: '', email: '', phone: '', attached_file_url: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (cart.items.length === 0) return alert('Your quote list is empty.');
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
        alert('Your RFQ has been successfully submitted! We will contact you shortly.');
        router.push('/');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border">
        <h2 className="text-xl font-medium text-slate-600 mb-4">Your Quote List is empty</h2>
        <Link href="/catalog">
          <Button>Browse Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items Table */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Selected Items</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.product.images?.[0] && (
                        <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-medium text-slate-900 line-clamp-1">{item.product.title_en}</div>
                        <div className="text-xs text-slate-500" dir="rtl">{item.product.title_ar}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => cart.updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>-</Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}>+</Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => cart.removeItem(item.product.id)} className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-4">Corporate Details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="client_name" render={({ field }) => (
              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="company_name" render={({ field }) => (
              <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="attached_file_url" render={({ field }) => (
              <FormItem>
                <FormLabel>Procurement List / Excel Link (Optional)</FormLabel>
                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting RFQ...' : 'Submit Request For Quote'}
              </Button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Our sales team will contact you within 24 hours with a personalized quote.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
