import React, { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Card, Dropdown, Input, Space, Switch } from 'antd';
import JobPostingQuestionForm from './JobPostingQuestionForm';

type Question = {
  question: string;
  questionType: string;
  required: boolean;
  icon: string;
};

const items: MenuProps['items'] = [
  {
    key: 'short-answer',
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
    key: 'long-answer',
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
    key: 'yes-no',
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
    key: 'multiple-choice',
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
    key: 'checkbox',
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
    key: 'file-upload',
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
    key: 'add-previous-questions',
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
  const [showEditCloseButtons, setShowEditCloseButtons] = useState(false);
  const [questionIcon, setQuestionIcon] = useState('')
  const [questionTypeText, setQuestionTypeText] = useState('')
  const [questionKey, setQuestionKey] = useState('')
  const [questionPlaceholder, setQuestionPlaceholder] = useState('')


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

  const showEditAndCloseHandler = (e) => {
    setShowEditCloseButtons(true);
  };

  const hideEditAndCloseHandler = (e) => {
    setShowEditCloseButtons(false);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e.key);
    const questionTypeKey = e.key
    switch(questionTypeKey) {
        case 'short-answer':
            setQuestionIcon('mdi-sort-variant');
            setQuestionTypeText('Short Answer');
            setQuestionKey('short-answer');
            setQuestionPlaceholder('E.g What is your hobby?');
            break;
        case 'long-answer':
            setQuestionIcon('mdi-format-align-left');
            setQuestionTypeText('Long Answer');
            setQuestionKey('long-answer');
            setQuestionPlaceholder('E.g What are you looking for in terms of career development?');
            break;
        case 'yes-no':
            setQuestionIcon('mdi-circle-slice-4');
            setQuestionTypeText('Yes/No');
            setQuestionKey('yes-no');
            setQuestionPlaceholder('E.g Do you have a driver\'s license?');
            break;
        case 'multiple-choice':
            setQuestionIcon('mdi-format-list-bulleted');
            setQuestionTypeText('Multiple Choice');
            setQuestionKey('multiple-choice');
            setQuestionPlaceholder('E.g How many years of experience do you have?');
            break;
        case 'checkbox':
            setQuestionIcon('mdi-checkbox-marked-outline');
            setQuestionTypeText('Checkbox');
            setQuestionKey('checkbox');
            setQuestionPlaceholder('E.g Keep my resume on file for future opportunities');
            break;
        case 'file-upload':
            setQuestionIcon('mdi-upload');
            setQuestionTypeText('File Upload');
            setQuestionKey('file-upload');
            setQuestionPlaceholder('E.g Please attach examples of your work');
            break;
        default:
            setQuestionIcon('mdi-sort-variant');
            setQuestionTypeText('Short Answer');
            setQuestionKey('short-answer');
            setQuestionPlaceholder('E.g What is your hobby?');
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <h1 className="mb-4">Additional Questions</h1>
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
      <Dropdown menu={menuProps}>
        <Button
          type="default"
          onClick={(e) => e.preventDefault()}
          className="text-blue-500 border-blue-500 rounded-none mt-4"
        >
          Add Question
          <DownOutlined />
        </Button>
      </Dropdown>
      {
        questionKey.length ?
        <JobPostingQuestionForm
            questionIcon={questionIcon}
            questionTypeText={questionTypeText}
            questionPlaceholder={questionPlaceholder}
       /> : ''
      }
      
    </>
  );
};
export default AdditionalQuestions;
