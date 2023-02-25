import { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import "./AddIdeaForm.css";
import { AddTags } from "./AddTags";

const { TextArea } = Input;

export function AddIdeaForm({ onSubmit, errorMessage }) {
  let skipSubmit = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const [form] = Form.useForm();

  const handleSubmit = async ({ idea }) => {
    if (skipSubmit.current) {
      skipSubmit.current = false;
      return;
    }

    setIsLoading(true);

    const success = await onSubmit({ idea, tags });

    if (success) {
      form.resetFields();
      setTags([]);
    }

    setIsLoading(false);
  };

  const onTagEnterPress = (newTag) => {
    skipSubmit.current = true;
    setTags([...tags, newTag]);
  };

  return (
    <div className="add-idea-form-container">
      <Form
        form={form}
        name="add-idea"
        className="add-idea-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          className="add-idea-form-input"
          name="idea"
          rules={[
            {
              required: true,
              message: "Enter an idea to submit",
            },
          ]}
        >
          <TextArea placeholder="Enter your idea" rows={2} />
        </Form.Item>

        <Form.Item className="add-idea-form-input" name="tags">
          <AddTags onPressEnter={onTagEnterPress} tags={tags} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="add-idea-form-button"
            disabled={isLoading}
          >
            Add Idea
          </Button>
        </Form.Item>
      </Form>
      <div className="add-idea-form-error-text">{errorMessage}</div>
    </div>
  );
}
