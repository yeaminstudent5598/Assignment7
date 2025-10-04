'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Home, FileText, Briefcase, Settings } from 'lucide-react';

const sidebarNavItems = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Blogs', href: '/dashboard', icon: FileText },
  { title: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[220px] lg:w-[240px] flex-col border-r bg-muted/40">
      <nav className="flex flex-col gap-1 p-4">
        {sidebarNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href
                  ? 'bg-muted hover:bg-muted font-medium'
                  : 'hover:bg-muted/50',
                'justify-start gap-3'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}