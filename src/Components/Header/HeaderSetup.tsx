import React, { useContext } from "react";
import { Flex, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";

const HeaderSetup: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const Authdispatch = useAuthDispatch();
  
  const handleClick = (e: any) => {
    dispatch({ type: "CHANGE_KEY", payload: e.key });
  };

  const { username, isLoggedin } = useAuthState();
  
  const logout = () => {
    Authdispatch({ type: "CLEAR_AUTH_DATA" });
  };

  console.log("AuthState:", username, isLoggedin);

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = !isLoggedin
    ? [
        {
          key: "home",
          label: <Link to="/">Home</Link>,
        },
        {
          key: "login",
          label: <Link to="/login">Login</Link>,
        },
      ]
    : [
        {
          key: "home",
          label: <Link to="/">Home</Link>,
        },
        {
          key: "logout",
          label: (
            <Link
              to="/"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>
          ),
        },
      ];

  return (
    <div style={headerStyle}>
      <Flex gap="middle" justify="space-between">
        <h1 style={{ margin: 0 }}>
          GenAI Powered Medico Legal Summarization & Insights.
        </h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[state.activeSection]}
          selectedKeys={[state.activeSection]}
          onClick={handleClick}
          items={items}
        />
      </Flex>
    </div>
  );
};

export default HeaderSetup;

// Sticky Header Styles
const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  width: "100%",
};
