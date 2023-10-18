import React, { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Card, Dropdown, Input, Space } from 'antd';

type Question = {
  question: string;
  questionType: string;
  required: boolean;
  icon: string;
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-sort-variant text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Short Answer</p>
          <p className="text-gray-500">Great for single sentences</p>
        </div>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-format-align-left text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Long Answer</p>
          <p className="text-gray-500">Great for detailed paragraphs</p>
        </div>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-circle-slice-4 text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Yes/No</p>
          <p className="text-gray-500">
            Provide two options to choose from on closed-ended questions.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: '4',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-format-list-bulleted text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Multiple Choice</p>
          <p className="text-gray-500">
            Provide several options to choose from
          </p>
        </div>
      </div>
    ),
  },
  {
    key: '5',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-checkbox-marked-outline text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Checkbox</p>
          <p className="text-gray-500">
            Great for confirmation. "I agree on..."
          </p>
        </div>
      </div>
    ),
  },
  {
    key: '6',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-upload text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">File Upload</p>
          <p className="text-gray-500">Allow candidates to attach files.</p>
        </div>
      </div>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '7',
    label: (
      <div className="flex items-center gap-x-2">
        <span className="mdi mdi-page-previous-outline text-2xl text-blue-500"></span>
        <div className="flex flex-col">
          <p className="text-gray-800 text-base">Add Previous Questions</p>
          {/* <p  className='text-gray-500'>Great for single sentences</p> */}
        </div>
      </div>
    ),
  },
];

const AdditionalQuestions = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [showEditCloseButtons, setShowEditCloseButtons] = useState(false);
  const questions: Question[] = [
    {
      question: 'How old are you? ',
      icon: 'mdi-circle-slice-4',
      questionType: 'Short',
      required: true,
    },
    {
        question: 'When will you want to join ',
        icon: 'mdi-sort-variant',
        questionType: 'Short',
        required: true,
      },
      {
        question: 'What are you telling us mainly? ',
        icon: 'mdi-format-align-left',
        questionType: 'Short',
        required: true,
      },
  ];

  const onInputChangeHandler = (e) => {
    setQuestionInput(e.target.value);
  };

  const showEditAndCloseHandler = (e) => {
    setShowEditCloseButtons(true);
  };

  const hideEditAndCloseHandler = (e) => {
    setShowEditCloseButtons(false);
  };

  return (
    <>
      <h1 className="mb-4">Additional Questions</h1>
      <Dropdown menu={{ items }}>
        <Button
          type="default"
          onClick={(e) => e.preventDefault()}
          className="text-blue-500 border-blue-500 rounded-none"
        >
          Add Question
          <DownOutlined />
        </Button>
      </Dropdown>

      <Card className="mt-4">
        <div className="flex items-center mb-2 gap-x-1">
          <span className="mdi mdi-circle-slice-4 text-2xl text-blue-500"></span>
          <span className="text-gray-800 text-base">Yes/No</span>
        </div>
        <Input
          placeholder="E.g What is your favourite color?"
          className="mb-3"
          allowClear
          onChange={onInputChangeHandler}
        />
        {questionInput.length ? (
          <div>
            <Button type="primary">Save</Button>
            <Button type="link">Cancel</Button>
          </div>
        ) : (
          ''
        )}
      </Card>

      {questions.map((question) => (
        <div
          key={question.question}
          className="flex justify-between items-center border-solid border-2 border-x-0 border-gray-200 hover:shadow-md bg-white mt-2"
          onMouseEnter={showEditAndCloseHandler}
          onMouseLeave={hideEditAndCloseHandler}
        >
          <div className="my-3 flex items-center">
            <span
              className={`mdi ${question.icon} text-2xl text-blue-500 mr-1 ml-3`}
            ></span>{' '}
            {question.question}
          </div>
          {showEditCloseButtons ? (
            <div className="flex mr-3 gap-x-1">
              <span className="mdi mdi-grease-pencil text-gray-500 text-xl hover:border-solid border-2"></span>
              <span className="mdi mdi-close-circle text-gray-500 text-xl hover:border-solid border-2"></span>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </>
  );
};
export default AdditionalQuestions;
