import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ConfigProvider, Empty } from "antd";
import { Colors } from "./constants/constantsUi";
import { SmileOutlined } from "@ant-design/icons";
import { pdfjs } from "react-pdf";
import { DataSourceProvider } from "./context/DataSourceContext";

// Set the workerSrc property to the path of the pdf.worker.js file
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const customizeRenderEmpty = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      height: "100%",
      minHeight: "70vh",
    }}
  >
    <Empty imageStyle={{ height: 160 }}>
      <p style={{ color: "red" }}>Sorry we could not find any data.</p>
      <p style={{ color: "red" }}>Please check again later.</p>
    </Empty>
  </div>
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <DataSourceProvider>
          <ConfigProvider
            renderEmpty={customizeRenderEmpty}
            theme={{
              token: {
                // Seed Token
                colorPrimary: Colors.primaryColor,
                borderRadius: 2,
                colorTextBase: Colors.whiteBG,
                colorTextPlaceholder: "gray",
              },
              components: {
                Table: {
                  /* here is your component tokens */
                  borderColor: Colors.blackBG,
                  headerColor: Colors.blackBG,
                  footerColor: Colors.whiteBG,
                  colorText: Colors.blackBG,
                  colorPrimaryActive: Colors.primaryColor,
                  colorTextDescription: Colors.blackBG,
                  colorTextHeading: Colors.blackBG,
                  colorBgBase: Colors.blackBG,
                  colorBgSolidActive: Colors.primaryColor,
                  colorPrimary: Colors.primaryColor,
                  rowHoverBg: "lightgray",
                  rowSelectedBg: Colors.primaryColor,
                },
                Upload: {
                  actionsColor: Colors.primaryColor,
                  colorTextBase: Colors.blackBG,
                  colorText: Colors.blackBG,
                  colorPrimaryActive: Colors.primaryColor,
                  colorTextDescription: Colors.blackBG,
                  colorTextHeading: Colors.blackBG,
                  colorBgBase: Colors.blackBG,
                  colorBgSolidActive: Colors.primaryColor,
                  colorPrimary: Colors.primaryColor,
                },
                Button: {
                  defaultBg: Colors.blackBG,
                  defaultColor: Colors.whiteBG,
                  defaultHoverBg: Colors.primaryColor,
                  defaultHoverColor: Colors.whiteBG,
                },
                Form: {
                  labelColor: Colors.primaryColor,
                },
                Input: {
                  colorText: Colors.blackBG,
                  colorIcon: Colors.primaryColor,
                  colorIconHover: Colors.blackBG,
                },
                Tooltip: {
                  colorText: Colors.blackBG,
                  colorBgSpotlight: Colors.primaryColor,
                },
                Menu: {
                  darkItemSelectedColor: "#FFD700",
                  darkItemBg: Colors.primaryColor,
                  darkItemColor: Colors.whiteBg,
                },
              },
            }}
          >
            <App />
          </ConfigProvider>
        </DataSourceProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);