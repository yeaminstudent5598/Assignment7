import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import DashboardNav from './dashboard/DashboardNav';
import DashboardSidebar from './dashboard/DashboardSidebar';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // এই লেআউটের অধীনে থাকা সব পেজের জন্য সেশন চেক
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DashboardSidebar />
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}