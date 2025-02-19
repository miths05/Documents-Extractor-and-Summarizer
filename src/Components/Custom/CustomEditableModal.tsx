import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { Colors } from "../../constants/constantsUi";
import "./CustomModal.css";

interface FormRules {
  required: boolean;
  message: string;
  pattern?: RegExp;
}
export interface FormField {
  name: string; // The name of the form field
  label: string; // The label for the form field
  rules: any;
}

type props = {
  visible: boolean;
  onCreate: (newRow: any) => void;
  onCancel: Function;
  loading: boolean;
  list: FormField[];
};
const CustomEditableModal: React.FC<props> = ({
  visible,
  onCreate,
  onCancel,
  loading,
  list,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        onCancel(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Modal
        className="modalcss"
        open={visible}
        title="Add New Row"
        okText="Add"
        cancelText="Cancel"
        onCancel={() => {
          form.resetFields();
          onCancel(false);
        }}
        onOk={() => {
          handleOk();

          //   form.resetFields();
        }}
        loading={loading}
        closable
        destroyOnClose
      >
        <Form form={form} layout="vertical" scrollToFirstError>
          {list.map((val: any) => {
            return (
              <Form.Item
                key={val.name}
                name={val.name}
                label={val.label}
                extra={val.extra}
                rules={val.rules}
                initialValue={val.name === "doctorName" ? "Dr. " : ""}
              >
                {val.name === "summary" ? (
                  <Input.TextArea rows={4} style={{ color: Colors.blackBG }} />
                ) : (
                  <Input style={{ color: Colors.blackBG }} />
                )}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </>
  );
};

export default CustomEditableModal;
