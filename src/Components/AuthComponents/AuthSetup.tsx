import React, { useState } from "react";
import logo from "../../logo.svg";
import "./AuthSetup.css";
import Login from "./Login";
import { Tabs } from "antd";
import SignUp from "./SignUp";
import { useAuthDispatch } from "../../context/AuthContext";
import { useNavigate } from "react-router";

type Props = {
  isLogo?: boolean;
};

const AuthSetup: React.FC<Props> = ({ isLogo = false }) => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [activeTab, setActiveTab] = useState("1");

  const onLogin = (values: any) => {
    console.log("Login Data:", values);
    dispatch({
      type: "SET_AUTH_DATA",
      payload: {
        username: values.username || "ameya31",
        email: values.email,
        phoneNumber: values.phone,
        id: "abcd1234",
        isLoggedin: true,
      },
    });
    navigate("/assignmentTracker");
  };

  const tabItems = [
    {
      key: "1",
      label: "Login",
      children: (
        <div className="auth-content">
          <h2 className="auth-header">Welcome Back!</h2>
          <p className="auth-subtitle">Sign in to continue with your work</p>
          <Login onLogin={onLogin} />
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: "Sign Up",
    //   children: (
    //     <div className="auth-content">
    //       <h2 className="auth-header">Let's Get You Started</h2>
    //       <p className="auth-subtitle">Create your account to get access</p>
    //       <SignUp onSignUp={onLogin} />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="auth-container">
      {isLogo && (
        <div className="logo-container">
          <img src={logo} className="auth-logo" alt="logo" />
        </div>
      )}
      <div className="auth-box">
        <Tabs
          defaultActiveKey="1"
          centered
          type="card"
          items={tabItems}
          className="auth-tabs"
          size="large"
          destroyInactiveTabPane
          onChange={(key) => setActiveTab(key)}
        />
      </div>
      <div className="auth-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthSetup;