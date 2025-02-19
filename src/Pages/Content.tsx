import React from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import AssignmentTrackerPage from "./AssignmentTrackerPage";
// import SlicingPage from "./SlicingPage";
import { Colors } from "../constants/constantsUi";
import FileTrackerPage from "./FileTrackerPage";
import CompletionTrackerPage from "./CompletionTrackerPage";
import Filler from "./Filler";
import Filler2 from "./Filler2";
import Filler3 from "./Filler3";
import Wordcloud from "./Wordcloud";
import TextAreaPage from "./TextAreaPage";
import AdminDashboard from "./AdminDashboard";
import Endpage from "./Endpage";
const ContentSetup: React.FC = () => {
  return (
    <Layout style={{ background: Colors.blackBG }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/assignmentTracker" element={<AssignmentTrackerPage />} />
        <Route path="/filler" element={<Filler />} />
        <Route path="/fileTracker" element={<FileTrackerPage />} />
        <Route path="/filler2" element={<Filler2 />} />
        <Route path="/completionTracker" element={<CompletionTrackerPage />} />
        <Route path="/filler3" element={<Filler3 />} />
        <Route path="/wordcloud" element={<Wordcloud />} />
        <Route path="/TextArea" element={<TextAreaPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/last" element={<Endpage />} />

      </Routes>
    </Layout>
  );
};

export default ContentSetup;
