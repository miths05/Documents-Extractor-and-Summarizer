import React from "react";
import { Form, Input, Button, Flex, InputNumber } from "antd";
import "./SignUp.css";

const SignUp: React.FC<{ onSignUp: (values: any) => void }> = ({
  onSignUp,
}) => {
  const onFinish = (values: any) => {
    onSignUp(values);
  };

  return (
    <div className="Signup-container">
      <div className="SignUpDiv">
        <Form onFinish={onFinish} className="FormDiv">
          <h2 className="signup-title">Sign Up</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="input-field" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="input-field" placeholder="Email" />
          </Form.Item>
          <Form.Item name="phone">
            <InputNumber className="input-field" style={{ width: "100%" }} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="input-field" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
