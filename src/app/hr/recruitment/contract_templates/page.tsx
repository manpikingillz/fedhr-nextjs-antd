'use client';

import './styles.scss';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useCallback, useEffect, useState } from 'react';
import MenuBar from './MenuBar';

const CustomEditor = () => {
  const [editorContent, setEditorContent] = useState('Hello <mark>{{fullName}}</mark>. This is my Initial Content'); // Initialize the state

  const fullName = 'John Doe'

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      TextStyle,
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

    const replaceData = ({field_name, display_name}: {field_name?: string, display_name?: string}) => {
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

    const addFieldsIntoContent = ({field_name, display_name}: {field_name: string, display_name: string}) => {
        // INSERT new content into the editor on the cursor position. Its not a replacement but inserting new content.
        insertTextAtCursor(`{{${display_name}}}`);

    }

    const insertTextAtCursor = (text) => {
        const { state, dispatch } = editor.view;

        // Create a transaction that inserts the text at the current cursor position
        const transaction = state.tr.insertText(text);
        console.log('transaction:::: ', transaction)

        // Dispatch the transaction to the editor
        dispatch(transaction);
    }

    const fields = [
        {
            field_name: 'full_name',
            display_name: 'Full Name'
        },
        {
            field_name: 'job_position',
            display_name: 'Job Position'
        }
    ]


  return (
    <>
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
      <button className='w-40' onClick={replaceData}>Replace data</button>
    </div>
    <div>
        <h1>Fields</h1>
        <ul>
            {fields.map((field, index) => (
                <li key={index} onClick={() => addFieldsIntoContent(field)} className='cursor-pointer'>
                    <span>{field.display_name}</span>
                </li>
            ))}
        </ul>
    </div>
    </>
  );
};

export default CustomEditor;
