import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminNav />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
