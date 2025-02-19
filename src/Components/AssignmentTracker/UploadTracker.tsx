import React, { useState } from "react";
import { CSSProperties } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button, Modal, Input } from "antd";
import { Colors } from "../../constants/constantsUi";
import "./UploadTracker.css";
import { useDataSourceState } from "../../context/DataSourceContext";

const { Dragger } = Upload;
const { TextArea } = Input;

const UploadTracker: React.FC = () => {
  const dataSource = useDataSourceState();
  const [selectedRow, setSelectedRow] = useState<string[] | any>(dataSource);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textValue, setTextValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Textarea value:", textValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  React.useEffect(() => {
    setSelectedRow(dataSource);
  }, [dataSource]);

  return (
    <div style={contentStyle}>
      <div style={headerStyle}>
        {/* <Button
          type="primary"
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-8 py-2 rounded-lg shadow-md transition-all duration-300"
          onClick={showModal}
        >
          Medical Summary
        </Button> */}
      </div>
      <Dragger
        {...props}
        disabled={!selectedRow}
        className={`border-2 border-dashed rounded-lg p-6 ${
          selectedRow
            ? "border-blue-500 hover:border-blue-700 hover:bg-blue-50 transition-all duration-300"
            : "border-gray-300 bg-gray-100 cursor-not-allowed"
        }`}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined className="text-3xl text-blue-500" />
        </p>
        <p className="textCss">
          {selectedRow ? `Click or drag file to this area to upload for ` : "Please select a record to begin!"}
        </p>
        <p className="textCss">Max Size 1GB</p>
      </Dragger>
      <Modal title="Enter Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} height={800} style={{top: 50}} >
        <TextArea
          rows={8} // Increased rows for better UX
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          style={{
            minHeight: "400px", // More space for text
            width: "100%", // Takes full width
            padding: "12px", // Better spacing inside
            fontSize: "16px", // Better readability
          }}
          placeholder="Enter details here..."
        />
      </Modal>
    </div>
  );
};

export default UploadTracker;

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: Colors.whiteBG,
  padding: 0,
  minHeight: "90vh",
  position: "relative",
};

const headerStyle: CSSProperties = {
  position: "absolute",
  top: 20,
  right: 20,
};
