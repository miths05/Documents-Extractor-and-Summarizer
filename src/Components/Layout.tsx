import React from "react";
import { Divider, Layout } from "antd";
import HeaderSetup from "./Header/HeaderSetup";
import ContentSetup from "../Pages/Content";
import FooterIntro from "./Footer/FooterIntro";
import { Colors } from "../constants/constantsUi";
const LayoutSetUp: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  const headerStyle: React.CSSProperties = {
    color: Colors.whiteBG,
    height: 64,
    backgroundColor: Colors.primaryColor,
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: Colors.whiteBG,
    minHeight: 80,
    backgroundColor: Colors.blackBG,
    padding: "2%",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    height: "100%",
    minHeight: "90vh",
    lineHeight: "120px",
    color: Colors.whiteBG,
    backgroundColor: `${Colors.blackBG} !important`,
    width: "100% !important",
  };

  const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    backgroundColor: Colors.blackBG,
  };
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderSetup />
      </Header>
      <Content style={contentStyle}>
        <ContentSetup />
      </Content>
      <Divider
        type="horizontal"
        variant="solid"
        style={{ borderColor: Colors.whiteBG, height: "100%", margin: 0 }}
      />
      <Footer style={footerStyle}>
        <FooterIntro />
      </Footer>
    </Layout>
  );
};

export default LayoutSetUp;
