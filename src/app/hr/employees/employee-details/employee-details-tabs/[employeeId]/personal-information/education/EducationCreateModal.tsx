import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const EducationCreateModal = ({
  isModelOpen,
  onModelClose,
}: {
  isModelOpen: boolean;
  onModelClose: () => void;
}) => {
  const handleOk = () => {
    onModelClose()
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default EducationCreateModal;
