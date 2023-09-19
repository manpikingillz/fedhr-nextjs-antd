'use client';

import './styles.scss';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import MenuBar from './MenuBar';

type TemplateField = {
    fieldNname?: string,
    displayNname: string,
    description: string
}

const fields = [
    {
        field_name: 'full_name',
        display_name: 'Full Name',
        description: 'Full name of the employee'
    },
    {
        field_name: 'job_position',
        display_name: 'Job Position',
        description: 'Job position of the employee'
    }
]

const CustomEditor = () => {
  const [editorContent, setEditorContent] = useState('Hello <mark>{{Full Name}}</mark>. This is my Initial Content'); // Initialize the state

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
      })
    ],
    content: editorContent
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
  }, [editor]);

  useEffect(() => {
    console.log('content:::: ', editorContent);
  }, [editorContent]);

    const replaceTemplateFieldsWithActualData = (fieldDisplayName: string, fieldData: string) => {
        const updatedContent = editorContent.replace(`{{${fieldDisplayName}}}`, fieldData);

        // Set the updated content inside the editor
        if (editor) editor.chain().setContent(updatedContent).run();

        setEditorContent(updatedContent);
    };

    const addTemplateFieldsIntoEditor = (field: TemplateField) => {
        // INSERT new content into the editor on the cursor position.
        insertTextAtCursor(`{{${field.displayNname}}}`);
    }

    const insertTextAtCursor = (text: string) => {
        const { state, dispatch } = editor.view;

        // Create a transaction that inserts the text at the current cursor position
        const transaction = state.tr.insertText(text);

        // Dispatch the transaction to the editor
        dispatch(transaction);
    }

    const onClickHandler = () => {
        replaceTemplateFieldsWithActualData('Full Name', 'Gilbert')
    }


  return (
    <>
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
      <button className='w-40' onClick={onClickHandler}>Replace data</button>
    </div>
    <div>
        <h1>Fields</h1>
        <ul>
            {fields.map((field, index) => (
                <li key={index} onClick={() => addTemplateFieldsIntoEditor(field)} className='cursor-pointer'>
                    <span>{field.display_name}</span>
                </li>
            ))}
        </ul>
    </div>
    </>
  );
};

export default CustomEditor;
