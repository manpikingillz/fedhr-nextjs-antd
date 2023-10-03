import './modal.scss'
import React, { useRef } from 'react';
import { Modal } from 'antd';
import { useParams } from 'next/navigation';


const NewEmailModal = ({
  isModelOpen,
  onModelClose,
}: {isModelOpen: boolean, onModelClose: () => void}) => {

  // Modal functions
  const handleOk = () => {
    onModelClose();
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Send an Email to Gilbert"
        // centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width='100%'
        className='mx-0'
        wrapClassName='fullscreen-modal'
    
      >
        <h1>Email modal</h1>
      </Modal>
    </>
  );
};

export default NewEmailModal;
