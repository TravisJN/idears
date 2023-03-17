import { useState, useCallback } from "react";
import { Button, Form, Input } from "antd";
import "./AddIdeaForm.css";
import { SelectTags } from "./SelectTags";

const { TextArea } = Input;

export function AddIdeaForm({ onSubmit, errorMessage, onResetForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();

  const resetForm = useCallback(() => {
    form.resetFields();
    setTags([]);
    onResetForm();
  }, [form, setTags, onResetForm]);

  const handleSubmit = useCallback(
    async ({ idea }) => {
      setIsLoading(true);

      const success = await onSubmit({ idea, tags });

      if (success) {
        resetForm();
      }

      setIsLoading(false);
    },
    [setIsLoading, onSubmit, tags, resetForm]
  );

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
          <TextArea placeholder="Enter your idea" rows={3} />
        </Form.Item>

        <Form.Item className="add-idea-form-input" name="tags">
          <SelectTags onTagsUpdate={setTags} tags={tags} />
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
