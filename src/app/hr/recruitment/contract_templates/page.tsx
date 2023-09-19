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
import { Button, List } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

type TemplateField = {
  fieldName?: string;
  displayName: string;
  description: string;
};

const fields: TemplateField[] = [
  {
    fieldName: 'first_name',
    displayName: 'Employee First Name',
    description: 'e.g Henry',
  },
  {
    fieldName: 'last_name',
    displayName: 'Last Name',
    description: 'e.g Tayebwa',
  },
  {
    fieldName: 'job_position',
    displayName: 'Job Position',
    description: 'e.g Software Engineer',
  },
  {
    fieldName: 'department',
    displayName: 'Department',
    description: 'e.g Finance',
  },
];

const CustomEditor = () => {
  const [editorContent, setEditorContent] = useState(
    'Hello <mark>{{Full Name}}</mark>. This is my Initial Content'
  ); // Initialize the state

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
    content: editorContent,
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

  const replaceTemplateFieldsWithActualData = (
    fieldDisplayName: string,
    fieldData: string
  ) => {
    const updatedContent = editorContent.replace(
      `{{${fieldDisplayName}}}`,
      fieldData
    );

    // Set the updated content inside the editor
    if (editor) editor.chain().setContent(updatedContent).run();

    setEditorContent(updatedContent);
  };

  const addTemplateFieldsIntoEditor = (field: TemplateField) => {
    // INSERT new content into the editor on the cursor position.
    insertTextAtCursor(`{{${field.displayName}}}`);
  };

  const insertTextAtCursor = (text: string) => {
    const { state, dispatch } = editor.view;

    // Create a transaction that inserts the text at the current cursor position
    const transaction = state.tr.insertText(text);

    // Dispatch the transaction to the editor
    dispatch(transaction);
  };

  const onClickHandler = () => {
    replaceTemplateFieldsWithActualData('Full Name', 'Gilbert');
  };

  return (
    <>
      <div className="flex w-full">
        <div className=" w-3/4">
          <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor} />
          </div>
          <Button type="primary" className='mt-2'>Save Template</Button>
        </div>

        <div className="bg-gray-100 ml-3 w-1/4 rounded-xl">
          <h1 className="ml-4 mb-2 mt-3 text-gray-700">
            <EditTwoTone className="mr-2" />
            Template Placeholders
          </h1>
          <p className="ml-4 mb-2 text-gray-500">
            You can insert these into the template and they will be replaced
            with the actual values when the document is created.
          </p>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={fields}
            renderItem={(field: TemplateField, index) => (
              <List.Item
                className="cursor-pointer"
                onClick={() => addTemplateFieldsIntoEditor(field)}
              >
                <List.Item.Meta
                  title={field.displayName}
                  description={field.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
