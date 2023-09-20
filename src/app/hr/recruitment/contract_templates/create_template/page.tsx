'use client';

import './styles.scss';

import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import MenuBar from './MenuBar';
import { Button, Input, List, Select } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useCreateTemplateMutation, useUpdateTemplateMutation } from './mutations';
import { TemplateCreateData, TemplateUpdateData } from './types';
import Placeholder from '@tiptap/extension-placeholder';


type TemplateField = {
  fieldName?: string;
  displayName: string;
  description: string;
};

const fields: TemplateField[] = [
  {
    fieldName: 'first_name',
    displayName: 'First Name',
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
  const [editorContent, setEditorContent] = useState<string>(''); // Initialize the state
  const [templateName, setTemplateName] = useState<string>(''); // Initialize the state
  const [templateType, setTemplateType] = useState<string>(''); // Initialize the state


  ////////////
  const createTemplateMutation = useCreateTemplateMutation();
  const updateTemplateMutation = useUpdateTemplateMutation();

  const createTemplate = (_template: TemplateCreateData) => {
    createTemplateMutation.mutate({ data: _template });
  };

  // const updateTemplate = (_template: TemplateUpdateData) => {
  //   updateTemplateMutation.mutate({ data: _template, id: templateData?.id });
  // };

  const saveTemplateHandler = () => {
    const _template: TemplateCreateData = {
      template_name: templateName,
      template_content: editorContent,
      template_type: templateType
    };
    createTemplate(_template);

    // if (Object.keys(templateData).length) {
    //   updateTemplate(_template);
    // } else {
    //   createTemplate(_template);
    // }
  };

  // FORM Functions
  // const handleSetFieldValue = () => {
  //   formInstance.setFieldsValue({
  //     course: templateData?.course?.id,
  //     completed: templateData?.completed ? dayjs(templateData?.completed) : null,
  //     cost: templateData?.cost,
  //     credits: templateData?.credits,
  //     hours: templateData?.hours,
  //     instructor: templateData?.instructor,
  //     note: templateData?.note
  //   });
  // };

  //////////

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      TextStyle,
      Placeholder.configure({
        placeholder: 'Type your content here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    // content: editorContent,
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

  const templateTypeOptions = () => {
    return [
      { value: 'EMAIL_TEMPLATE', label: 'Email Template' },
      { value: 'JOB_OFFER_TEMPLATE', label: 'Job Offer Template' },
      { value: 'CONTRACT_TEMPLATE', label: 'Contract Template' }
    ]
  }

  const onTemplateNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateName(e.target.value);
  }
  const onTemplateTypeChangeHandler = (value: string) => {
    setTemplateType(value);
  }

  return (
    <>
      <Input className='w-2/5 mb-3 mr-3' placeholder='Template Name' allowClear onChange={onTemplateNameChangeHandler}/>
      <Select
        placeholder="Select Template Type"
        style={{ width: 240 }}
        allowClear
        options={templateTypeOptions()}
        onChange={onTemplateTypeChangeHandler}
        // onChange={(value) => setTemplateType(value)}
      />
      <div className="flex w-full">
        {/* Editor */}
        <div className="w-3/4">
          <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor} />
          </div>
          <Button type="primary" className='mt-2' onClick={saveTemplateHandler}>Save Template</Button>
        </div>

        {/* Template Fields */}
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
