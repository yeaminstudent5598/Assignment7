import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BlogActions from './BlogActions';

// Blog ডেটার জন্য একটি টাইপ ডিফাইন করা
interface Blog {
  id: string;
  title: string;
  createdAt: string;
}

// সার্ভার থেকে ব্লগগুলো ফেচ করার ফাংশন
async function getBlogs(): Promise<Blog[]> {
const sessionCookie = (await cookies()).get('next-auth.session-token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`, {
    headers: {
      Cookie: `next-auth.session-token=${sessionCookie}`,
    },
    cache: 'no-store', // ড্যাশবোর্ডের জন্য সবসময় নতুন ডেটা দরকার
  });

  if (!res.ok) {
    console.error('Failed to fetch blogs');
    return [];
  }
  const data = await res.json();
  return data.data; // আমাদের catchAsync data অবজেক্টের ভেতরে ডেটা পাঠায়
}

export default async function DashboardPage() {
  // সার্ভার কম্পোনেন্টে সেশন এবং রোল চেক
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const blogs = await getBlogs();

  return (
    <main className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Button asChild>
          <Link href="/dashboard/blogs/create">Create New Blog</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <BlogActions blogId={blog.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}