import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Login.css";
import ForgotPassword from "./ForgotPassword";

const Login: React.FC<{ onLogin: (values: any) => void }> = ({ onLogin }) => {
  const onFinish = (values: any) => {
    onLogin(values);
  };

  const [isForgotPassword, setForgotPassword] = useState<boolean>(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {!isForgotPassword ? (
          <Form onFinish={onFinish} className="login-form">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                className="input-field"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="input-field"
              />
            </Form.Item>

            <div className="login-options">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Button
                type="link"
                className="forgot-password"
                onClick={() => setForgotPassword(true)}
              >
                Forgot password?
              </Button>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <ForgotPassword
            onForgot={onFinish}
            setForgotPassword={setForgotPassword}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
