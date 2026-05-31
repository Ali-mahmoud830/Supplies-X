import prisma from '@/lib/prisma';
import SettingsClient from './SettingsClient';

export default async function SettingsAdminPage() {
  let settings = null;
  try {
    settings = await prisma.settings.findFirst();
  } catch(error) {
    console.error('Failed to fetch settings in admin:', error);
  }
  
  const defaultSettings = settings || {
    phone: '+201000000000',
    email: 'contact@supplies-x.com',
    addressEn: 'Cairo, Egypt',
    addressAr: 'القاهرة، مصر',
    facebook: '',
    linkedin: ''
  };

  return (
    <div className="p-0 md:p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Site Settings</h1>
      <SettingsClient initialData={defaultSettings} />
    </div>
  );
}
