import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import CreateBlogForm from '../../CreateBlogForm';

export default async function CreateBlogPage() {
  // পেজটি সুরক্ষিত করা হচ্ছে
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <main className="container p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Blog Post</h1>
        <p className="text-muted-foreground">Fill out the form below to publish a new article.</p>
      </div>
      <CreateBlogForm />
    </main>
  );
}