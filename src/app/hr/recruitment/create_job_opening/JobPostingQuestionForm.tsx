import { Card, Input, Switch, Button } from 'antd';
import { useState } from 'react';

const JobPostingQuestionForm = ({
  questionIcon,
  questionTypeText,
  questionKey,
  questionPlaceholder,
  onCancelHandler,
  onAddQuestionHandler,
}: //   onRequiredSwitchChangeHandler
{
  questionIcon: string;
  questionTypeText: string;
  questionKey: string;
  questionPlaceholder: string;
  onCancelHandler: (value) => void;
  onAddQuestionHandler: (question, required) => void;
  //   onRequiredSwitchChangeHandler: (value) => void;
}) => {
  const [questionInput, setQuestionInput] = useState('');
  const [requiredInput, setRequiredInput] = useState(false);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<any[]>([]);

  const onInputChangeHandler = (e) => {
    setQuestionInput(e.target.value);
  };

  const onRequiredSwitchChangeHandler = (value) => {
    console.log('switch required: ', value);
    setRequiredInput(value);
  };

  const addMultipleChoiceOptionHandler = () => {
    setMultipleChoiceOptions((prev) => [...prev, prev.length]);
  };

  const onChoiceRemoveHandler = (index) => {
    const filterChoices = multipleChoiceOptions.filter((_, idx) => idx != index)
    setMultipleChoiceOptions(() => [...filterChoices])
}

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
              unCheckedChildren="Optional"
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
        {questionKey === 'multiple-choice' && (
          <div>
            {/* Only rendered for multiple choice */}
            <p className="text-zinc-500 mb-3">Response Options</p>
            {multipleChoiceOptions.map((_, index) => (
              <div className="flex gap-x-2 mb-2" key={index}>
                <Input
                  prefix={
                    <span className="mdi mdi-view-headline text-zinc-600"></span>
                  }
                  className="w-80"
                  placeholder={`Response ${index + 1}`}
                />
                <span className="mdi mdi-close-circle text-gray-500 text-xl hover:border-solid border-2"
                onClick={() => onChoiceRemoveHandler(index)}
                ></span>
              </div>
            ))}
            <div
              className="flex mt-2 mb-4 cursor-pointer"
              onClick={addMultipleChoiceOptionHandler}
            >
              <span className="mdi mdi-plus text-blue-500"></span>
              <span className="text-blue-500">Add Option</span>
            </div>
          </div>
        )}

        {questionInput.length ? (
          <div>
            <Button
              type="primary"
              onClick={() => onAddQuestionHandler(questionInput, requiredInput)}
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
