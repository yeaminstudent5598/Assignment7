import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  liveLink?: string;
  githubLink?: string;
  features: string;
  technologies: string;
  createdAt: string;
}

async function getProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 160),
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`);
    const data = await res.json();
    const projects: Project[] = data.data || [];
    return projects.map((project) => ({ id: project.id }));
  } catch (error) {
    console.error('Failed to generate static params for projects:', error);
    return [];
  }
}

export default async function SingleProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Parse features and technologies safely
  let features: string[] = [];
  let technologies: string[] = [];

  try {
    if (typeof project.features === 'string') {
      features = project.features.split(',').map((f) => f.trim());
    } else if (Array.isArray(project.features)) {
      features = project.features;
    }
  } catch (error) {
    features = [];
  }

  try {
    if (typeof project.technologies === 'string') {
      technologies = project.technologies.split(',').map((t) => t.trim());
    } else if (Array.isArray(project.technologies)) {
      technologies = project.technologies;
    }
  } catch (error) {
    technologies = [];
  }

  return (
    <main className="container max-w-5xl py-12 md:py-20">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Created on{' '}
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveLink && (
              <Button asChild>
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </Link>
              </Button>
            )}
            {project.githubLink && (
              <Button variant="outline" asChild>
                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </Link>
              </Button>
            )}
          </div>

          {project.thumbnail && (
            <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
            </div>
          )}
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
        </section>

        {technologies.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {features.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Key Features</h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 pt-8 border-t">
          <Button variant="ghost" asChild>
            <Link href="/projects">← Back to All Projects</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}