'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  // useSession হুক দিয়ে বর্তমান ইউজারের লগইন স্ট্যাটাস চেক করা হচ্ছে
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Your Name</span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link href="/about" className="text-foreground/60 transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="/projects" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Projects
            </Link>
            <Link href="/blogs" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Blogs
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session?.user ? (
            // ইউজার লগইন করা থাকলে Dashboard বাটন দেখাবে
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            // ইউজার লগইন করা না থাকলে Login বাটন দেখাবে
            <Button asChild variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}