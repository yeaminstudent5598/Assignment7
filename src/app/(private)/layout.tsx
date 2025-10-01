// src/app/(private)/layout.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

// একটি সাধারণ ড্যাশবোর্ড Navbar
function DashboardNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/dashboard" className="font-bold">
                    Admin Dashboard
                </Link>
                <Button variant="outline" asChild>
                    <Link href="/api/auth/signout">Logout</Link>
                </Button>
            </div>
        </header>
    );
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-grow">{children}</main>
    </div>
  );
}