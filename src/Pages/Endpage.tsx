import React from "react";
import { Row, Col, Image } from "antd";
import StepsTracker from "../Components/Custom/StepsTracker";

import land from "../Images/land.png";


const endpage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 15 }}
          >
            <Image
              preview={false}
              alt="Slicing"
              src={land}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Col>
          {/* <Col
            xs={{ span: 0 }}
            sm={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ span: 1 }}
          >
            <Divider
              type="vertical"
              variant="solid"
              style={{ borderColor: "#fff", height: "100%" }}
            />
          </Col> */}
          {/* <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 8 }}
          >
          </Col> */}
          {/* <AuthSetup /> */}

        </Row>
      </div>
      <StepsTracker step={4} />
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#f0f0f0",
        }}
      >
        <Row justify="space-between">
          <Col xs={24} sm={24} md={6} lg={8} style={{ textAlign: "left" }}>
            <h4>S3K Technologies | discover@s3ktech.ai</h4>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Row justify="space-between">
              <Col span={12}>
                <h4>United States | India</h4>
              </Col>
              <Col span={12}>
                <h4>Private & Confidential</h4>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} style={{ textAlign: "end" }}>
            <Image
              src="../../logo.svg"
              alt="logo"
              preview={false}
              style={{
                maxWidth: 60,
                maxHeight: 60,
                objectFit: "contain",
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default endpage;
