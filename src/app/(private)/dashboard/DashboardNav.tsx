import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { LogoutButton } from './LogoutButton';
import { MobileNav } from './MobileNav';

export default async function DashboardNav() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/dashboard" className="text-lg font-bold">
            Admin Panel
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            {session?.user?.email}
          </span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}