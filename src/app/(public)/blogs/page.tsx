import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles and thoughts on web development.',
};

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string; // thumbnail is optional
  createdAt: string;
}

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="container py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">From the Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Welcome to my blog. Here are some of my thoughts and articles.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <Card className="h-full transition-transform hover:scale-105 flex flex-col">
                {blog.thumbnail && (
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div
                    className="text-sm text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }}
                  />
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
            No blog posts found.
          </p>
        )}
      </section>
    </main>
  );
}