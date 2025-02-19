import React from "react";
import { Form, Input, Button, Flex } from "antd";
import "./ForgotPassword.css";
const ForgotPassword: React.FC<{
  setForgotPassword: any;
  onForgot: (values: any) => void;
}> = ({ onForgot, setForgotPassword }) => {
  const onFinish = (values: any) => {
    onForgot(values);
  };

  return (
    <div className="LoginDiv">
      <Form onFinish={onFinish} className="FormDiv">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Flex vertical>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              Send Reset Link
            </Button>
            <Button
              type="primary"
              style={{ marginTop: 5, marginBottom: 5 }}
              onClick={() => {
                setForgotPassword(false);
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
