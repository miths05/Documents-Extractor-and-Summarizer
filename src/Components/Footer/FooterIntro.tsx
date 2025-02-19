import React from "react";
import { Col, Row, Image } from "antd";
import logo from "../../logo.svg";
const FooterIntro: React.FC = () => {
  return (
    <div>
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
            src={logo}
            alt={"logo"}
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
  );
};

export default FooterIntro;
