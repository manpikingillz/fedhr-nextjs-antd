import { Button, Form, Input } from 'antd';
const { TextArea } = Input;

interface NoteFormProps {
  formName: string
  saveNoteHandler: any;
  onFocusHandler: any;
  isButtonHidden: boolean;
  onCancelHandler: any;
}

export default function NoteForm({
  formName,
  saveNoteHandler,
  onFocusHandler,
  isButtonHidden,
  onCancelHandler
}: NoteFormProps) {
  return (
    <Form name={formName} onFinish={saveNoteHandler}>
      <Form.Item
        name="note"
        rules={[{ required: true, message: 'Write a note!' }]}
      >
        <TextArea onFocusCapture={onFocusHandler} />
      </Form.Item>
      <Form.Item hidden={isButtonHidden}>
        <Button htmlType="submit" type="primary">
          Post
        </Button>
        <Button type="link" onClick={onCancelHandler}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
