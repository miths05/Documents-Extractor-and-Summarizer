import React from "react";
import { Row, Col, Button } from "antd";
import { CSSProperties } from "react";
import { Colors } from "../../constants/constantsUi";
import { useNavigate } from "react-router";

type Props = {
  step: number;
};

const buttonStyle: CSSProperties = {
  margin: "20px",
  padding: "16px 28px",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "12px",
  minWidth: "160px",
  cursor: "pointer",
  border: "none",
  backgroundColor: 'rgb(24, 144, 255)', // Modern indigo color
  color: "white",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "#4f46e5", // Darker shade on hover
    transform: "translateY(-1px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
};

const colStyle: CSSProperties = {
  margin: 0,
  padding: 0,
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: Colors.whiteBG,
  padding: 0,
  margin: 0,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  height: "70px",
};

const StepsTracker: React.FC<Props> = ({ step }) => {
  let navigate = useNavigate();

  const next = () => {
    switch (step) {
      case 1:
        navigate("/fileTracker");
        break;
      case 2:
        navigate("/completionTracker");
        break;
      case 3:
        navigate("/wordcloud");
        break;
      case 4:
        navigate("/TextArea");
        break;
      case 9:
        navigate("/endpage");
        break;
      default:
        break;
    }
  };

  const back = () => {
    switch (step) {
      case 3:
        navigate("/fileTracker");
        break;
      case 2:
        navigate("/assignmentTracker");
        break;
      default:
        break;
    }
  };

  return (
    <div style={contentStyle}>
      <Row align={"middle"} justify={"end"} wrap style={{ width: "100%" }}>
        {step !== 1 && (
          <Col style={colStyle}>
            <Button style={buttonStyle} type="primary">
              Home
            </Button>
          </Col>
        )}
        {step !== 1 && (
          <Col style={colStyle}>
            <Button style={buttonStyle} type="primary" onClick={back}>
              Back
            </Button>
          </Col>
        )}
        <Col style={colStyle}>
          <Button style={buttonStyle} type="primary" onClick={next}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StepsTracker;