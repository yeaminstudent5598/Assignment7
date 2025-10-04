// src/app/(public)/blogs/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string; // thumbnail field যোগ করুন
  createdAt: string;
}

async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch blog with ID ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const plainTextContent = blog.content.replace(/<[^>]*>?/gm, "");

  return {
    title: blog.title,
    description: plainTextContent.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: plainTextContent.substring(0, 160),
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`);
    const data = await res.json();
    const blogs: Blog[] = data.data || [];
    return blogs.map((blog) => ({ id: blog.id }));
  } catch (error) {
    console.error("Failed to generate static params for blogs:", error);
    return [];
  }
}

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto py-12 md:py-20">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl text-center">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Published on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          
          {/* Thumbnail যোগ করুন */}
          {blog.thumbnail && (
            <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}