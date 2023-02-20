import { useState } from "react";
import { Button, Form, Input } from "antd";
import "./AddIdeaForm.css";

const { TextArea } = Input;

export function AddIdeaForm({ onSubmit, errorMessage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const success = await onSubmit(values);

    if (success) {
      form.resetFields();
    }

    setIsLoading(false);
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
          <TextArea placeholder="Enter your idea" autoSize />
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
