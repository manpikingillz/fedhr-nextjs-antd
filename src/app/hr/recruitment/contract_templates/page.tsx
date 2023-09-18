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
  const [editorContent, setEditorContent] = useState('<h1>Hello {{fullName}}. This is my Initial Content</h1>'); // Initialize the state

  const fullName = 'John Doe'

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
    content: editorContent//`<h1>Hello {{fullName}}. This is my Initial Content</h1>`,
  });

  useEffect(() => {
    console.log('editor:::: ', editorContent);

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

    const replaceData = () => {
        console.log('replace data');
        const updatedContent = editorContent.replace('{{fullName}}', fullName);
        console.log('updatedContent:::: ', updatedContent)
        if (editor) {
            editor.chain().setContent(updatedContent).run(); // Set the updated content inside the editor
            console.log('edito updated:::: ', editor.getHTML())
        }
        // if (editor) {
        //     // Parse the updated content into a ProseMirror Node
        //     const contentNode = editor.parser.parse(updatedContent);
    
        //     // Apply a transaction to replace the content
        //     editor.view.dispatch(
        //         editor.view.state.tr.replaceWith(0, editor.view.state.doc.content.size, contentNode)
        //     );
        // }
        setEditorContent(updatedContent);
    };

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
      <button className='w-40' onClick={replaceData}>Replace data</button>
    </div>
  );
};

export default CustomEditor;
