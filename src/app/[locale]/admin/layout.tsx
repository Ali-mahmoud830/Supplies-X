import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 relative w-full overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full pt-20 md:pt-8 md:pl-72 max-w-full">
        {children}
      </main>
    </div>
  );
}
