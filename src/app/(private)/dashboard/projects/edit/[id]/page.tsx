import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';
import EditProjectForm from '../../../EditProjectForm';

async function getProjectById(id: string): Promise<Project | null> {
  const cookie = (await cookies()).get('next-auth.session-token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects/${id}`, {
    headers: { Cookie: `next-auth.session-token=${cookie}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function EditProjectPage({ params: awaitedParams }: { params: Promise<{ id: string }> }) {
  const params = await awaitedParams; // ✅ এখানে await করা হচ্ছে
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">Update the details of your project.</p>
      </div>
      <EditProjectForm initialData={project} />
    </main>
  );
}
