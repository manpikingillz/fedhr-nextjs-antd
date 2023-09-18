'use client';

import './styles.scss';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useCallback, useEffect, useState } from 'react';
import MenuBar from './MenuBar';

const CustomEditor = () => {
  const [editorContent, setEditorContent] = useState(''); // Initialize the state

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: '<h1>This is my Initial Content</h1>',
  });

  useEffect(() => {
    if (editor) {
      const updateContent = () => {
        setEditorContent(editor.getHTML());
      };

      editor.on('update', updateContent);

      return () => {
        editor.off('update', updateContent);
      };
    }
    console.log('contettt:::: ', editorContent);
  }, [editor]);

  useEffect(() => {
    console.log('content:::: ', editorContent);
  }, [editorContent]);

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

export default CustomEditor;
