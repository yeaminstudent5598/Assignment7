import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  features: string;
  technologies: string;
  liveLink?: string;
  githubLink?: string;
  thumbnail?: string;
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="container py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">My Projects</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Here are some of the projects I've worked on. Feel free to explore them.
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => {
            // Parse features and technologies safely
            let techList: string[] = [];
            
            try {
              if (typeof project.technologies === 'string') {
                techList = project.technologies.split(',').map(t => t.trim());
              } else if (Array.isArray(project.technologies)) {
                techList = project.technologies;
              }
            } catch (error) {
              techList = [];
            }

            return (
              <Card key={project.id} className="flex flex-col group">
                <Link href={`/projects/${project.id}`}>
                  <CardHeader className="cursor-pointer">
                    {project.thumbnail && (
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                  </CardHeader>
                </Link>

                <Link href={`/projects/${project.id}`} className="flex-grow">
                  <CardContent className="cursor-pointer">
                    <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techList.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {techList.length > 3 && (
                        <Badge variant="outline">+{techList.length - 3} more</Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="flex gap-2">
                  {project.githubLink && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.liveLink && (
                    <Button size="sm" asChild className="flex-1">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live
                      </Link>
                    </Button>
                  )}
                  <Button variant="secondary" size="sm" asChild className="flex-1">
                    <Link href={`/projects/${project.id}`}>Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
            No projects found.
          </p>
        )}
      </section>
    </main>
  );
}