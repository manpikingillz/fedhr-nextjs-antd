import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import JobPostingQuestionForm from './JobPostingQuestionForm';

type Question = {
  question: string;
  icon: string;
  key: string;
  required: boolean;
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
        </div>
      </div>
    ),
  },
];

const AdditionalQuestions = () => {
  const [hoveredQuestionItem, setHoveredQuestionItem] = useState();
  const [questionIcon, setQuestionIcon] = useState('');
  const [questionTypeText, setQuestionTypeText] = useState('');
  const [questionKey, setQuestionKey] = useState('');
  const [questionPlaceholder, setQuestionPlaceholder] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questiontoEditIndex, setQuestiontoEditIndex] = useState();

  const showEditAndCloseHandler = (index) => {
    console.log('hovered: ', index);
    setHoveredQuestionItem(index);
  };

  const hideEditAndCloseHandler = (e) => {
    setHoveredQuestionItem(undefined);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e.key);
    const questionTypeKey = e.key;
    switch (questionTypeKey) {
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
        setQuestionPlaceholder(
          'E.g What are you looking for in terms of career development?'
        );
        break;
      case 'yes-no':
        setQuestionIcon('mdi-circle-slice-4');
        setQuestionTypeText('Yes/No');
        setQuestionKey('yes-no');
        setQuestionPlaceholder("E.g Do you have a driver's license?");
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
        setQuestionPlaceholder(
          'E.g Keep my resume on file for future opportunities'
        );
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

  const onJobPostingFormCancelHandler = (index) => {
    console.log('cancel edit: ', index);
    if (index > -1) setQuestiontoEditIndex(undefined);
    setQuestionKey('');
  };

  const onSaveHandler = (value) => {
    console.log('value: ', {
      question: value,
      icon: questionIcon,
      required: true,
    });

    if (!questiontoEditIndex) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          question: value,
          icon: questionIcon,
          key: questionKey,
          required: true,
        },
      ]);
    } else {
      // edit question
      console.log('editing question: ', questiontoEditIndex);
      const questionsWithEditedItem = questions.map((item, index) => {
        if (index == questiontoEditIndex) item['question'] = value;
        return item;
      });
      setQuestions((_) => [...questionsWithEditedItem]);
    }
    setQuestiontoEditIndex(undefined)
    setQuestionKey('');
    console.log('questions: ', questions);
  };

  const onRequiredSwitchChangeHandler = (value) => {
    console.log('required: ', value);
  };

  const removeQuestionHandler = (idx) => {
    const filteredQns = questions.filter((_, index) => idx !== index);
    setQuestions((_) => [...filteredQns]);
  };

  const onEditQuestionHandler = (idx) => {
    console.log('edit: ', idx);
    setQuestiontoEditIndex(idx);
  };

  return (
    <>
      <h1 className="mb-4">Additional Questions</h1>
      {questions.map((question, index) => (
        <>
          {/* Shows when edit button was clicked */}
          {questiontoEditIndex === index ? (
            <JobPostingQuestionForm
              questionIcon={question.icon}
              questionTypeText={question.question}
              questionPlaceholder={questionPlaceholder}
              onCancelHandler={() => onJobPostingFormCancelHandler(index)}
              onAddQuestionHandler={onSaveHandler}
              onRequiredSwitchChangeHandler={onRequiredSwitchChangeHandler}
            />
          ) : (
            // Normal list item when edit icon is not clicked. This should be refactored to a component to make it more readable
            <div
              key={question.question}
              className="flex justify-between items-center border-solid border-2 border-x-0 border-gray-200 hover:shadow-md bg-white mt-2"
              onMouseEnter={() => showEditAndCloseHandler(index)}
              onMouseLeave={hideEditAndCloseHandler}
            >
              <div className="my-3 flex items-center">
                <span
                  className={`mdi ${question.icon} text-2xl text-blue-500 mr-1 ml-3`}
                ></span>{' '}
                {question.question}
              </div>
              {hoveredQuestionItem == index ? (
                <div className="flex mr-3 gap-x-1">
                  <span
                    className="mdi mdi-grease-pencil text-gray-500 text-xl hover:border-solid border-2"
                    onClick={() => onEditQuestionHandler(index)}
                  ></span>
                  <span
                    className="mdi mdi-close-circle text-gray-500 text-xl hover:border-solid border-2"
                    onClick={() => removeQuestionHandler(index)}
                  ></span>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </>
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
      {questionKey.length ? (
        <JobPostingQuestionForm
          questionIcon={questionIcon}
          questionTypeText={questionTypeText}
          questionPlaceholder={questionPlaceholder}
          onCancelHandler={onJobPostingFormCancelHandler}
          onAddQuestionHandler={onSaveHandler}
          onRequiredSwitchChangeHandler={onRequiredSwitchChangeHandler}
        />
      ) : (
        ''
      )}
    </>
  );
};
export default AdditionalQuestions;
