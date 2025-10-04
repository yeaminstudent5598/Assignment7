import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  // ডিফল্ট টাইটেল এবং টাইটেল টেমপ্লেট
  title: {
    default: "Yeamin Madbor's Portfolio",
    template: `%s | Yeamin Madbor`,
  },
  description: 'A personal portfolio website showcasing projects and skills by Yeamin Madbor, a full-stack developer.',
  openGraph: {
    title: "Yeamin Madbor's Portfolio",
    description: 'A personal portfolio website.',
    type: 'website',
    locale: 'en_US',
    url: 'yeaminmadbor.com', // আপনার লাইভ ডোমেইন দিন
  },
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
          GeistSans.variable,
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