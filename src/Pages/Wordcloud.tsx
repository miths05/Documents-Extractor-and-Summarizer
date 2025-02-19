import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col, Button, Modal, Input } from "antd";
import PdfViewer from "../Components/AssignmentTracker/PdfViewer";
import DataTrackerr from "../Components/AssignmentTracker/DataTrackerr";
import StepsTracker from "../Components/Custom/StepsTracker";
import { useDataSourceState } from "../context/DataSourceContext";

type props = {
  primaryColor?: string;
};

const Wordcloud: React.FC<props> = ({
  primaryColor = "#00b96b",
}) => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");

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

  return (
    <div style={contentStyle}>
      <div style={pageHeaderStyle}>
        <Button
          type="primary"
          style={buttonStyle}
          onClick={showModal}
          onMouseEnter={(e) => {
            const button = e.currentTarget as HTMLButtonElement;
            Object.assign(button.style, {
              backgroundColor: '#096dd9',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
            });
          }}
          onMouseLeave={(e) => {
            const button = e.currentTarget as HTMLButtonElement;
            Object.assign(button.style, buttonStyle);
          }}
        >
          Medical Summary
        </Button>
      </div>

      <Row gutter={[16, 16]} style={rowStyle}>
        <Col xs={24} sm={24} md={12}>
          <div style={sectionStyle}>
            <div style={sectionHeaderContainerStyle}>
              <h2 style={sectionHeaderStyle}>Prevalent Conditions Before Injury</h2>
            </div>
            <div style={iframeContainerStyle}>
              <iframe
                src={fileUrl || "https://drive.google.com/file/d/1mEJSqPhg-AvPD3Xke1hIa-ikyuoI6Kma/preview"}
                width="100%"
                height="450px"
                style={iframeStyle}
                title="PDF Viewer"
                allow="autoplay"
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div style={sectionStyle}>
            <div style={sectionHeaderContainerStyle}>
              <h2 style={sectionHeaderStyle}>Prevalent Conditions After Injury</h2>
            </div>
            <div style={iframeContainerStyle}>
              <iframe
                src={fileUrl || "https://drive.google.com/file/d/1y0MJecZ_pegEiodI3ZauA0nOeXoCi_tN/preview"}
                width="100%"
                height="450px"
                style={iframeStyle}
                title="PDF Viewer"
                allow="autoplay"
              />
            </div>
          </div>
        </Col>
      </Row>

      <div style={stepTrackerContainerStyle}>
        <StepsTracker step={4} />
      </div>

      <Modal 
        title={<div style={modalTitleStyle}>Enter Medical Summary</div>}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        width={800}
        style={{top: 50}}
        className="medical-summary-modal"
      >
        <Input.TextArea
          rows={6}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          style={textAreaStyle}
          placeholder="Enter medical summary details here..."
        />
      </Modal>
    </div>
  );
};

export default Wordcloud;

/* --- Enhanced Styling --- */

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: 'rgb(199, 222, 255)',
  padding: "16px 24px",
  minHeight: "90vh",
  position: "relative",
  gap: "16px",
};

const pageHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  marginBottom: "16px",
  padding: "0 8px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#1a1a1a",
  margin: 0,
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
};

const rowStyle: React.CSSProperties = {
  height: "100%",
  margin: "0",
};

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  overflow: "hidden",
  height: "100%",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const sectionHeaderContainerStyle: React.CSSProperties = {
  padding: "16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  background: "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.95))",
};

const sectionHeaderStyle: React.CSSProperties = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: 0,
  textAlign: "center",
};

const iframeContainerStyle: React.CSSProperties = {
  padding: "12px",
  height: "calc(100% - 60px)",
};

const iframeStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "8px",
  boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.05)",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1890ff',
  borderColor: '#1890ff',
  borderRadius: '6px',
  color: '#ffffff',
  fontWeight: 600,
  padding: '8px 20px',
  height: 'auto',
  fontSize: '15px',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 2px 6px rgba(24, 144, 255, 0.2)',
};

const stepTrackerContainerStyle: React.CSSProperties = {
  marginTop: "24px",
  padding: "0 8px",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1a1a1a",
  padding: "6px 0",
};

const textAreaStyle: React.CSSProperties = {
  minHeight: "300px",
  width: "100%",
  padding: "12px",
  fontSize: "15px",
  lineHeight: "1.5",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  resize: "vertical",
  boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.05)",
};

