import { Checkbox, Switch } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';

const ApplicationQuestions = () => {
  const [resumeChecked, setResumeChecked] = useState(true);
  const [addressChecked, setAddressChecked] = useState(true);
  const [linkedInChecked, setLinkedInChecked] = useState(true);
  const [dateAvailableChecked, setDateAvailableChecked] = useState(true);
  const [desiredSalaryChecked, setDesiredSalaryChecked] = useState(true);
  const [coverLetterChecked, setCoverLetterChecked] = useState(true);
  const [refferedChecked, setRefferedChecked] = useState(true);
  const [websiteChecked, setWebsiteChecked] = useState(true);
  const [twitterChecked, setTwitterChecked] = useState(true);
  const [highestEducationChecked, setHighestEducationChecked] = useState(true);
  const [collegeChecked, setCollegeChecked] = useState(true);
  const [referencesChecked, setReferencesChecked] = useState(true);

  const onResumeChange = (e: CheckboxChangeEvent) => {
    setResumeChecked(e.target.checked);
  };

  const onAddressChange = (e: CheckboxChangeEvent) => {
    setAddressChecked(e.target.checked);
  };

  const onLinkedInChange = (e: CheckboxChangeEvent) => {
    setLinkedInChecked(e.target.checked);
  };

  const onDateAvailableChange = (e: CheckboxChangeEvent) => {
    setDateAvailableChecked(e.target.checked);
  };

  return (
    <>
      <div className='mb-3'>
        <h1>Application Questions</h1>
      </div>

    <div className='flex gap-x-4'>
      <div className='flex flex-col gap-y-1'>
        <div>
          <Checkbox checked={resumeChecked} onChange={(e) => setResumeChecked(e.target.value)}>
            Resume
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={addressChecked} onChange={(e) => setAddressChecked(e.target.value)}>
            Address
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={linkedInChecked} onChange={(e) => setLinkedInChecked(e.target.value)}>
            LinkedIn URL
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={dateAvailableChecked} onChange={(e) => setDateAvailableChecked(e.target.value)}>
            Date Available
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <div>
          <Checkbox checked={desiredSalaryChecked} onChange={(e) => setDesiredSalaryChecked(e.target.value)}>
            Desired Salary
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={coverLetterChecked} onChange={(e) => setCoverLetterChecked(e.target.value)}>
            Cover Letter
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={refferedChecked} onChange={(e) => setRefferedChecked(e.target.value)}>
            Reffered by (Name)
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={websiteChecked} onChange={(e) => setWebsiteChecked(e.target.value)}>
            Website, Blog or Portfolio
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <div>
          <Checkbox checked={twitterChecked} onChange={(e) => setTwitterChecked(e.target.value)}>
            Twitter Username
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={highestEducationChecked} onChange={(e) => setHighestEducationChecked(e.target.value)}>
            Highest Education
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={collegeChecked} onChange={(e) => setCollegeChecked(e.target.value)}>
            College / University
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>

        <div>
          <Checkbox checked={referencesChecked} onChange={(e) => setReferencesChecked(e.target.value)}>
            References
          </Checkbox>
          <Switch checkedChildren="Required" unCheckedChildren="Optional" />
        </div>
      </div>

    </div>
    </>
  );
};

export default ApplicationQuestions;
