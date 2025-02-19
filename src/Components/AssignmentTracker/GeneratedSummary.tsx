import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Colors } from "../../constants/constantsUi";
import { Form, Typography, Space, Input, Button } from "antd";
import { CSSProperties } from "react";

import "./GeneratedSummary.css";

type props = {
  dataRow: any;
};

const GeneratedSummary: React.FC<props> = ({ dataRow }) => {
  const [dataSource, setDataSource] = useState<any>(undefined);
  const { Text } = Typography;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [summary, setSummary] = useState<string>(
    dataSource !== undefined
      ? dataSource.summary
      : "Please select a row to see data."
  );

  useEffect(() => {
    if (dataRow !== undefined) {
      setDataSource(dataRow);
      console.log("Saved text:", dataRow.summary);
      // Update the form field value when dataSource changes
      const local = dataRow.summary !== "" ? dataRow.summary : "N/A";
      form.setFieldsValue({
        summaryText: local,
      });
      setSummary(local);
    }
  }, [dataRow, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saved text:", values.summaryText);
      setSummary(values.summaryText);
      setEditMode(false);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };

  return (
    <div style={contentStyle}>
      <Space direction="vertical" className="spacecss">
        <Text className="textStyle">
          Confidence Score :
          {dataSource !== undefined
            ? dataSource.confidenceScore
            : "Please select a row to see data."}
        </Text>
        <Text className="textStyle">
          Action for User :{" "}
          {dataSource !== undefined
            ? dataSource.actionForUser
            : "Please select a row to see data."}
        </Text>
        <Form form={form} layout="vertical" style={{ minWidth: 350 }}>
          {editMode ? (
            <Form.Item
              style={{ width: "100%" }}
              name="summaryText"
              rules={[{ required: true, message: "Text is required." }]}
            >
              <Input.TextArea
                size="large"
                placeholder="Type your summary here..."
                style={{
                  height: 300,
                  minWidth: 400,
                  fontSize: 14,
                }}
                className="paraCss"
              />
            </Form.Item>
          ) : (
            <div className="paraDiv">
              <Text className="textStyle">{summary}</Text>
            </div>
          )}
          {dataSource !== undefined && (
            <div className="buttonSec">
              <Button onClick={handleSave} type="primary">
                Save
              </Button>

              <Button
                onClick={() => {
                  setEditMode(true);
                }}
                type="primary"
              >
                Edit
              </Button>
            </div>
          )}
        </Form>
      </Space>
    </div>
  );
};

export default GeneratedSummary;

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  paddingRight: "5px",
  minHeight: "90vh",
};
