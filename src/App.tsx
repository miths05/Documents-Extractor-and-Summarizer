import React from "react";
import "./App.css";
import LayoutSetUp from "./Components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <LayoutSetUp />
      </Router>
    </div>
  );
}

export default App;
