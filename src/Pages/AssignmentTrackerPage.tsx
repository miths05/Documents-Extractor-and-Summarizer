import React from "react";
import { Row, Col, Card, Typography, Spin } from "antd";
import { CSSProperties } from "react";
import DataTrackerr from "../Components/AssignmentTracker/DataTrackerr";
import UploadTracker from "../Components/AssignmentTracker/UploadTracker";
import { Colors } from "../constants/constantsUi";
import StepsTracker from "../Components/Custom/StepsTracker";
import { generateData } from "../constants/DataGeneration";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const AssignmentTrackerPage: React.FC = () => {
  const visibleColumns = ["key", "documentName", "pages", "status", "dueDate", "actualCompletion", "managerReview"];
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  const getData = async () => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(generateData());
      setLoading(false);
    }, 3000);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div style={contentStyle}>
      <Row gutter={[4, 4]}>
        <Col xs={24} md={16}>
          <Card hoverable style={cardStyle}>
            <Title level={5} style={titleStyle}>📌 File Tracker</Title>
            <DataTrackerr dataSource={dataSource} visibleColumns={visibleColumns} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable style={cardStyle}>
            <Title level={5} style={titleStyle}>📤 Upload Documents</Title>
            <div style={uploadContainerStyle}><UploadTracker /></div>
          </Card>
        </Col>
      </Row>
      <div style={stepsTrackerContainerStyle}><StepsTracker step={1} /></div>
      <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 18, color: Colors.primaryColor }} spin />} />
    </div>
  );
};
export default AssignmentTrackerPage;

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  background: "rgb(199 222 255)",
  padding: "5px 2px",
  minHeight: "100vh",
};

const cardStyle: CSSProperties = {
  borderRadius: "6px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
  padding: "5px",
  backgroundColor: "#ffffff",
  textAlign: "center",
};

const titleStyle: CSSProperties = {
  marginBottom: "5px",
  fontWeight: 500,
  fontSize: "12px",
  color: "#333",
};

const uploadContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const stepsTrackerContainerStyle: CSSProperties = {
  marginTop: "5px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
