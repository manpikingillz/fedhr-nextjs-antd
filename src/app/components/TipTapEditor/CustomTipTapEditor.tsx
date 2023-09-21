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
import Placeholder from '@tiptap/extension-placeholder';
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from '@/app/mutations/template-mutations';
import {
  TemplateCreateData,
  TemplateDetailData,
  TemplateListData,
  TemplateUpdateData,
} from '@/app/types/template-types';

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

const CustomTipTapEditor = ({
  templateData,
  replaceVariables = false,
}: {
  templateData: TemplateDetailData;
  replaceVariables: boolean;
}) => {
  const [editorContent, setEditorContent] = useState<string>(''); // Initialize the state
  const [templateName, setTemplateName] = useState<string>(''); // Initialize the state
  const [templateType, setTemplateType] = useState<string>(''); // Initialize the state
  const [templateInfo, setTemplateInfo] = useState<TemplateDetailData>(
    {} as TemplateDetailData
  ); // Initialize the state
  const [templateContent, setTemplateContent] = useState<string>(''); // Initialize the state

  // Editor
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
    content: editorContent,
  });

  // Creating and updating template data into the db
  const createTemplateMutation = useCreateTemplateMutation();
  const updateTemplateMutation = useUpdateTemplateMutation();

  const createTemplate = (_template: TemplateCreateData) => {
    createTemplateMutation.mutate({ data: _template });
  };

  const updateTemplate = (_template: TemplateUpdateData) => {
    updateTemplateMutation.mutate({ data: _template, id: templateData?.id });
  };

  const saveTemplateHandler = () => {
    const _template: TemplateCreateData | TemplateUpdateData = {
      template_name: templateName,
      template_content: editor.getHTML(), //editorContent,
      template_type: templateType,
    };

    if (Object.keys(templateData).length) {
      updateTemplate(_template);
    } else {
      createTemplate(_template);
    }
  };

  // Setting the template data into the editor
  useEffect(() => {
    if (templateData) {
      // console.log('templateData: ', templateData)
      setTemplateName(templateData?.template_name);
      setTemplateType(templateData.template_type);
      setTemplateContent(templateData.template_content);
      setTemplateInfo(templateData);
    }
  }, [templateData]);

  useEffect(() => {
    if (templateName) console.log('templateName: ', templateName);
    if (templateType) console.log('templateType: ', templateType);
    if (templateContent) console.log('templateContent: ', templateContent);
    if (templateInfo) console.log('templateInfo: ', templateInfo);

    replaceTemplateFieldsWithActualData(
      'First Name',
      'Gilbert',
      templateContent
    );
  }, [templateName, templateType, editorContent, templateInfo]);

    

  //   useEffect(() => {
  //     if (editor) {
  //       const updateContent = () => {
  //         setEditorContent(editor.getHTML());
  //       };

  //       editor.on('update', updateContent);

  //       return () => {
  //         editor.off('update', updateContent);
  //       };
  //     }
  //   }, [editor]);

  const replaceTemplateFieldsWithActualData = (
    fieldDisplayName: string,
    fieldData: string,
    content: string
  ) => {
    // Replace the template field with the actual data only if the replaceVariables is true
    let updatedContent = content;
    if (replaceVariables) {
      updatedContent = content.replace(`{{${fieldDisplayName}}}`, fieldData);
    }

    // Set the updated content inside the editor
    if (editor) editor.chain().setContent(updatedContent).run();

    // update state
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


  const templateTypeOptions = () => {
    return [
      { value: 'EMAIL_TEMPLATE', label: 'Email Template' },
      { value: 'JOB_OFFER_TEMPLATE', label: 'Job Offer Template' },
      { value: 'CONTRACT_TEMPLATE', label: 'Contract Template' },
    ];
  };

  const onTemplateNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemplateName(e.target.value);
  };
  const onTemplateTypeChangeHandler = (value: string) => {
    setTemplateType(value);
  };

  return (
    <>
      <Input
        className="w-2/5 mb-3 mr-3"
        placeholder="Template Name"
        allowClear
        onChange={onTemplateNameChangeHandler}
        value={templateName}
      />
      <Select
        placeholder="Select Template Type"
        style={{ width: 240 }}
        allowClear
        options={templateTypeOptions()}
        onChange={onTemplateTypeChangeHandler}
        value={templateType}
        // onChange={(value) => setTemplateType(value)}
      />
      <div className="flex w-full">
        {/* Editor */}
        <div className="w-3/4">
          <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor} />
          </div>
          <Button type="primary" className="mt-2" onClick={saveTemplateHandler}>
            Save Template
          </Button>
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

export default CustomTipTapEditor;
