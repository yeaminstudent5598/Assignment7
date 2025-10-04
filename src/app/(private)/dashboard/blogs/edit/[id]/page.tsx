import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import EditBlogForm from '../../../EditBlogForm';
import { Blog } from '@prisma/client';

async function getBlogById(id: string): Promise<Blog | null> {
  const cookie = (await cookies()).get('next-auth.session-token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs/${id}`, {
    headers: { Cookie: `next-auth.session-token=${cookie}` },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params; // ✅ params কে await করা হয়েছে
  const blog = await getBlogById(awaitedParams.id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="text-muted-foreground">Update your blog post details.</p>
      </div>
      <EditBlogForm initialData={blog} />
    </main>
  );
}
