import { Card, Input, Switch, Button } from 'antd';
import { useState } from 'react';

const JobPostingQuestionForm = ({
  questionIcon,
  questionTypeText,
  questionPlaceholder,
  onCancelHandler,
  onAddQuestionHandler,
  onRequiredSwitchChangeHandler
}: {
  questionIcon: string;
  questionTypeText: string;
  questionPlaceholder: string;
  onCancelHandler: (value) => void;
  onAddQuestionHandler: (value) => void;
  onRequiredSwitchChangeHandler: (value) => void;
}) => {
  const [questionInput, setQuestionInput] = useState('');

  const onInputChangeHandler = (e) => {
    setQuestionInput(e.target.value);
  };


  return (
    <>
      <Card className="mt-4">
        <div className="flex justify-between">
          <div className="flex items-center mb-2 gap-x-1">
            <span
              className={`mdi ${questionIcon} text-2xl text-blue-500`}
            ></span>
            <span className="text-gray-800 text-base">{questionTypeText}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Switch
              checkedChildren="Required"
              unCheckedChildren="Not Required"
              defaultChecked
              onChange={onRequiredSwitchChangeHandler}
            />
            <span
              className="mdi mdi-close-circle text-gray-500 text-xl hover:border-solid border-2"
              onClick={onCancelHandler}
            ></span>
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
            <Button
              type="primary"
              onClick={() => onAddQuestionHandler(questionInput)}
            >
              Save
            </Button>
            <Button type="link" onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default JobPostingQuestionForm;
