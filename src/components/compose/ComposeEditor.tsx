"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

interface ComposeEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function ComposeEditor({
  initialContent,
  onChange,
  placeholder,
}: ComposeEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 dark:text-blue-400 underline",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Compose email",
      }),
    ],
    content: initialContent || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm max-w-none focus:outline-none min-h-[150px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      <EditorToolbar editor={editor} />
    </div>
  );
}
