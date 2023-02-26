import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./AuthForm.css";

export function AuthForm({ onFinish, isSignUp, errorMessage }) {
  return (
    <div className="auth-form-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email address",
            },
            {
              required: true,
              message: "Please input your Email",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password",
            },
          ]}
          label="Password"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </Form.Item>
        {isSignUp ? (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
            />
          </Form.Item>
        ) : (
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {isSignUp ? "Sign up" : "Log in"}
          </Button>
          {isSignUp ? (
            <Link to={`/login`}>Already have an account?</Link>
          ) : (
            <Link to={`/signup`}>No account? Sign up!</Link>
          )}
        </Form.Item>
      </Form>
      <div className="auth-form-error-text">{errorMessage}</div>
    </div>
  );
}
