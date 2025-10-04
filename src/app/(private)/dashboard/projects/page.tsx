import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProjectActions from '../ProjectActions';

// প্রজেক্ট ডেটার জন্য একটি টাইপ
interface Project {
  id: string;
  title: string;
  liveLink: string;
  createdAt: string;
}

// সার্ভার থেকে প্রজেক্টগুলো ফেচ করার ফাংশন
async function getProjects(): Promise<Project[]> {
  // সার্ভার-সাইড ফেচের জন্য কুকি প্রয়োজন
  const cookie = (await cookies()).get('next-auth.session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`, {
    headers: {
      Cookie: `next-auth.session-token=${cookie}`,
    },
    cache: 'no-store', // ড্যাশবোর্ডের জন্য সবসময় নতুন ডেটা দরকার
  });

  if (!res.ok) {
    console.error('Failed to fetch projects');
    return [];
  }
  const data = await res.json();
  return data.data;
}

export default async function ProjectsDashboardPage() {
  const projects = await getProjects();

  return (
    <div className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button asChild>
          <Link href="/dashboard/projects/create">Create New Project</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Name</TableHead>
                <TableHead>Live Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="underline hover:text-primary"
                      >
                        View Site
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Edit/Delete বাটনের জন্য Client Component */}
                      <ProjectActions projectId={project.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}