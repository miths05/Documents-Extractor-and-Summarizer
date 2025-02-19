import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Manager Dashboard</h1>
        {/* <p>Under Construction, Part of Release 2.0</p> */}
      </header>
      <div style={buttonContainerStyle}>
        <button style={{ ...buttonStyle, backgroundColor: "#4b3c50" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#6b5b7a"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4b3c50"}>
          Admin
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#b22222" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d9534f"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#b22222"}>
          Approver Workflow
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#008080" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#20b2aa"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#008080"}>
          Work Assigner
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#ff8c00" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ffa500"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ff8c00"}>
          Status Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: 'rgb(199, 222, 255)',
  padding: "20px",
};

const headerStyle: React.CSSProperties = {
  marginBottom: "30px",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#fff",
};

const buttonContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  width: "80%",
};

const buttonStyle: React.CSSProperties = {
  padding: "25px 50px",
  fontSize: "20px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
};
