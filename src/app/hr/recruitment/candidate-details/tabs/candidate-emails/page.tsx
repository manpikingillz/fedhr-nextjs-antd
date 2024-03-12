'use client';

import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import NewEmailModal from './NewEmailModal';
import { useState } from 'react';

const CandidateEmails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEmailModalOpenHandler = () => {
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <NewEmailModal
          isModelOpen={isModalOpen}
          onModelClose={onModelCloseHandler}
        />
      )}
      <Button
        type="default"
        icon={<MailOutlined />}
        className="text-blue-500 font-bold border-blue-500 rounded-none"
        onClick={onEmailModalOpenHandler}
      >
        New Email
      </Button>
    </>
  );
};

export default CandidateEmails;
