'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Blog } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateBlogFormSchema } from '@/lib/validations/blog';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface EditBlogFormProps {
  initialData: Blog;
}

export default function EditBlogForm({ initialData }: EditBlogFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateBlogFormSchema>>({
    resolver: zodResolver(updateBlogFormSchema),
    defaultValues: {
      title: initialData.title || '',
      content: initialData.content || '',
      thumbnail: initialData.thumbnail || '',
    },
  });

  async function onSubmit(values: z.infer<typeof updateBlogFormSchema>) {
    try {
      const response = await fetch(`/api/v1/blogs/${initialData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post.');
      }

      toast.success('Blog updated successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your blog title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Thumbnail Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Blog Content</FormLabel>
              <FormControl>
                <RichTextEditor value={field.value || ''} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Updating...' : 'Update Post'}
        </Button>
      </form>
    </Form>
  );
}