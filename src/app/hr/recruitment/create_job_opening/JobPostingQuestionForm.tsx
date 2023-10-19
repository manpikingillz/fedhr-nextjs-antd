import { Card, Input, Switch, Button } from 'antd';
import { useState } from 'react';

const JobPostingQuestionForm = ({questionIcon, questionTypeText, questionPlaceholder}: {questionIcon: string, questionTypeText: string, questionPlaceholder: string}) => {
  const [questionInput, setQuestionInput] = useState('');

  const onInputChangeHandler = (e) => {
    setQuestionInput(e.target.value);
  };

  return (
    <>
      <Card className="mt-4">
        <div className="flex justify-between">
          <div className="flex items-center mb-2 gap-x-1">
            <span className={`mdi ${questionIcon} text-2xl text-blue-500`}></span>
            <span className="text-gray-800 text-base">{questionTypeText}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Switch
              checkedChildren="Required"
              unCheckedChildren="Not Required"
              defaultChecked
            />
            <span className="mdi mdi-close-circle text-gray-500 text-xl hover:border-solid border-2"></span>
          </div>
        </div>
        <Input
          placeholder={questionPlaceholder}
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
    </>
  );
};

export default JobPostingQuestionForm;
