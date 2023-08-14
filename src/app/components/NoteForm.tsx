import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
const { TextArea } = Input;

interface NoteFormProps {
  formName: string
  saveNoteHandler: any;
  onFocusHandler: any;
  isButtonHidden: boolean;
  onCancelHandler: any;
  note: string;
  isUpdate: boolean
}

export default function NoteForm({
  formName,
  saveNoteHandler,
  onFocusHandler,
  isButtonHidden,
  onCancelHandler,
  note,
  isUpdate

}: NoteFormProps) {
  const [form] = Form.useForm();

  const handleSetFieldValue = () => {
    form.setFieldsValue({
      note: note
    })
    console.log('form::: ', form)
  }

  useEffect(() => {
    handleSetFieldValue()
  },[]);
  
  return (
    <Form name={formName} onFinish={saveNoteHandler} form={form}>
      <Form.Item
        name="note"
        rules={[{ required: true, message: 'Write a note!' }]}
      >
        <TextArea onFocusCapture={onFocusHandler}/>
      </Form.Item>
      <Form.Item hidden={isButtonHidden}>
        <Button htmlType="submit" type="primary">
          { isUpdate? 'Save': 'Post'}
        </Button>
        <Button type="link" onClick={onCancelHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

