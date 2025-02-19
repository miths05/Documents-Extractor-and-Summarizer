import React from "react"; 
import { Row, Col, Image, Typography, Card } from "antd";
import { AuthSetup } from "../Components/AuthComponents";
import IntoImg from "../Images/IntoImg.png";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
      }}
    >
      <Row style={{ width: "100%" }} align="middle" justify="center" gutter={[16, 16]}>
        {/* <Col xs={24} sm={24} md={12} lg={14}>
          <Image
            preview={false}
            alt="Login Illustration"
            src={IntoImg}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </Col> */}
        <Col xs={48} sm={48} md={100} lg={24}>
          <Card
            bordered={false}
            style={{
              padding: "px",
              textAlign: "center",
              borderRadius: 10,
              boxShadow: "0 4px 8px rgba(90, 62, 62, 0.1)",
            }}
          >
            {/* <Title level={2} style={{ color: "#1E3A8A", fontSize: "5rem" }}>
              Login
            </Title> */}
            <AuthSetup />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
