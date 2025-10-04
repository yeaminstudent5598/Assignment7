import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, Linkedin, Mail, Code2, Briefcase, BookOpen } from 'lucide-react';

// Featured projects preview 
async function getFeaturedProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.slice(0, 3); 
  } catch (error) {
    return [];
  }
}


async function getLatestBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.slice(0, 3); 
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const blogs = await getLatestBlogs();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 py-20 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="px-4 py-1">
            Full-Stack Developer
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Yeamin Madbor
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            I build modern web applications with Next.js, React, and TypeScript. 
            Passionate about creating elegant solutions to complex problems.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/yeaminstudent5598" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/yeamin-madbor-83b3302b8/" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="yeaminstudent5598@gmail.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="border-y bg-muted/50 p-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">What I Do</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Building responsive and performant web applications using modern technologies
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Full-Stack Solutions</CardTitle>
                <CardDescription>
                  End-to-end development from database design to user interface implementation
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Technical Writing</CardTitle>
                <CardDescription>
                  Sharing knowledge through blog posts and documentation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="container p-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <Button asChild variant="ghost">
              <Link href="/projects">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => {
              const techList = typeof project.technologies === 'string' 
                ? project.technologies.split(',').map((t: string) => t.trim())
                : [];

              return (
                <Card key={project.id} className="group p-6 overflow-hidden">
                  <Link href={`/projects/${project.id}`}>
                    {project.thumbnail && (
                      <div className="aspect-video  relative overflow-hidden">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover rounded-[10px] transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className='p-0'>
                      <CardTitle className="group-hover:text-primary mt-2 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mb-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {techList.slice(0, 3).map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {blogs.length > 0 && (
        <section className="border-t bg-muted/50 p-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Latest Blog Posts</h2>
              <Button asChild variant="ghost">
                <Link href="/blogs">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog: any) => (
                <Card key={blog.id} className="group p-6">
                  <Link href={`/blogs/${blog.id}`}>
                    {blog.thumbnail && (
                      <div className="aspect-video rounded-[10px] relative overflow-hidden">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className='p-0'>
                      <CardTitle className="group-hover:text-primary mt-4 transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className='p-0'>
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                      <div
                        className="text-sm text-muted-foreground line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: blog.content.substring(0, 150) + '...',
                        }}
                      />
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container p-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <h2 className="text-3xl font-bold">Let's Work Together</h2>
            <p className="max-w-[600px] text-primary-foreground/90">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="mailto:your.email@example.com">
                Get In Touch <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}