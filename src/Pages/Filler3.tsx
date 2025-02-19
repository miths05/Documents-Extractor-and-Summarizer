import React from "react";
import { Row, Col, Image } from "antd";
import StepsTracker from "../Components/Custom/StepsTracker";

import insightsimg from "../Images/Insights.png";


const Filler3: React.FC = () => {
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
              src={insightsimg}
              style={{ width: "130%", height: "100%", objectFit: "contain" }}
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
      <StepsTracker step={6} />
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#f0f0f0",
        }}
      >
        
      </div>
    </div>
  );
};

export default Filler3;
