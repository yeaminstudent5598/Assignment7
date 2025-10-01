import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // <-- সঠিক ইম্পোর্ট
import { GeistMono } from 'geist/font/mono';   // <-- সঠিক ইম্পোর্ট
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils'; // shadcn থেকে আসা একটি helper ফাংশন

export const metadata: Metadata = {
  title: 'Portfolio Admin',
  description: 'Portfolio management dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable, // <-- ভ্যারিয়েবলগুলো এখানে যোগ করুন
          GeistMono.variable
        )}
      >
        <AuthProvider>
          <Toaster richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}