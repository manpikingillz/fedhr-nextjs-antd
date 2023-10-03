import './modal.scss';
import './editor.scss';
import React, { useRef } from 'react';
import { Button, Card, List, Modal, Select } from 'antd';
import { useParams } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

const TiptapEditor = ({ onChange, minHeightValue }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Email Subject',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
  });

  // Cleanup on component unmount
  return (
    <EditorContent
      editor={editor}
      style={{
        backgroundColor: 'white',
        cursor: 'text',
        borderRadius: '0.5em',
        minHeight: minHeightValue, //'100px',
        borderColor: '#D9D9D9',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    />
  );
};

const NewEmailModal = ({
  isModelOpen,
  onModelClose,
}: {
  isModelOpen: boolean;
  onModelClose: () => void;
}) => {
  // Modal functions
  const handleOk = () => {
    onModelClose();
  };

  const handleCancel = () => {
    onModelClose();
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Modal
        title="Send an Email to Gilbert"
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Send Now"
        width="100%"
        className="mx-0"
        wrapClassName="fullscreen-modal"
      >
        <Card className="fit-modal-height">
          <div className="flex gap-x-3">
            <div className="basis-3/4">
              <div className="flex justify-between">
                <Select
                  className="md:w-1/4 sm:w-full mb-3"
                  showSearch
                  placeholder="-- No Template --"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  allowClear
                  options={[
                    {
                      value: '1',
                      label: 'Phone Conversation Request',
                    },
                    {
                      value: '2',
                      label: 'Invitation to In-Person Interview',
                    },
                    {
                      value: '3',
                      label: 'Regret to Inform - Applicant',
                    },
                    {
                      value: '4',
                      label: 'Regret to Inform - Interviewed',
                    },
                    {
                      value: '5',
                      label: 'Regret to Inform - International',
                    },
                    {
                      value: '6',
                      label: 'Request for References',
                    },
                  ]}
                />
                <p className="text-blue-500 cursor-pointer">Preview Email</p>
              </div>
              <div className="mb-4">
                <TiptapEditor
                  onChange={(content) => {
                    console.log(content);
                  }}
                  minHeightValue="20px"
                />
              </div>
              <TiptapEditor
                onChange={(content) => {
                  console.log(content);
                }}
                minHeightValue="100px"
              />
              <Button className="mt-6">Attach Files</Button>
            </div>
            <div className="basis-1/4 bg-zinc-100">
              <p className="ml-3 my-3 font-bold">Email Placeholders</p>
              <p className="ml-3 text-gray-500 mb-2">
                You can insert these into the email and they will be replaced
                with the actual values when the email is sent.
              </p>
              <List
                size="small"
                itemLayout="horizontal"
                dataSource={fields}
                renderItem={(field: TemplateField, index) => (
                  <List.Item className="cursor-pointer hover:bg-zinc-50">
                    <List.Item.Meta
                      title={field.displayName}
                      description={field.description}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default NewEmailModal;
