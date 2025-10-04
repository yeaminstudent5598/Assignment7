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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogActions from './BlogActions';

interface Blog {
  id: string;
  title: string;
  createdAt: string;
}
 
async function getBlogs(): Promise<Blog[]> {
  const sessionCookie = (await cookies()).get('next-auth.session-token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`, {
    headers: {
      Cookie: `next-auth.session-token=${sessionCookie}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('Failed to fetch blogs');
    return [];
  }
  const data = await res.json();
  return data.data;
}

export default async function DashboardPage() {
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

      <Card>
        <CardHeader>
          <CardTitle>Your Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
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
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <BlogActions blogId={blog.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No blogs found. Start by creating a new one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}