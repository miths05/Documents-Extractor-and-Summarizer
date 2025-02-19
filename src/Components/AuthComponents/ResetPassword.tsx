import React from "react";
import { Form, Input, Button } from "antd";

const ResetPassword: React.FC = () => {
  const onFinish = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log("Password reset request:", values);
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Reset Password</h2>
      <Form name="reset-password" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
