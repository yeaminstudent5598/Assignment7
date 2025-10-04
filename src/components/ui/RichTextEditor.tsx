'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';

// টুলবারের জন্য আলাদা কম্পোনেন্ট
const TiptapToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-md border border-input bg-transparent p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

// মূল Rich Text Editor কম্পোনেন্ট
export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // প্রয়োজন না হলে কিছু বাটন নিষ্ক্রিয় করতে পারেন
        // যেমন: codeBlock: false,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl rounded-md border min-h-[150px] border-input bg-background p-4 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      // কন্টেন্ট পরিবর্তন হলে `onChange` ফাংশনটি কল করা হচ্ছে
      onChange(editor.getHTML());
    },
    // SSR এরর সমাধানের জন্য এই লাইনটি যোগ করা হয়েছে
    immediatelyRender: false,
  });

  return (
    <div className="flex min-h-[200px] flex-col justify-stretch gap-2">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}