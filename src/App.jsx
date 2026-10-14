import React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx"
import SubjectPage from "./pages/SubjectPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import NoticePage from "./pages/NoticePage.jsx";
import CRDashboardPage from "./pages/CR/CRDashboardPage.jsx"
import CRSubjectPage from "./pages/CR/CRSubjectPage.jsx";
import CRTaskPage from "./pages/CR/CRTaskPage.jsx";
import CRNoticePage from "./pages/CR/CRNoticePage.jsx";
import CRAddSubjectPage from "./pages/CR/CRAddSubjectPage.jsx";
import CRAddTaskPage from "./pages/CR/CRAddTaskPage.jsx";
import CRAddNoticePage from "./pages/CR/CRAddNoticePage.jsx";
import CRAddPdfPage from "./pages/CR/CRAddPdfPage.jsx";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CRManageStudentPage from "./pages/CR/CRManageStudentPage.jsx";
import CRAddStudentPage from "./pages/CR/CRAddStudentPage.jsx";
import AsStudentOrAsCrPage from "./pages/AsStudentOrAsCrPage.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/subject/:subjectName" element={<SubjectPage/>}/>
        <Route path="/task/:id" element={<TaskPage/>}/>
        <Route path="/notice/:id" element={<NoticePage/>}/>
        <Route path="/CRdashboard" element={<CRDashboardPage/>}/>
        <Route path="/CRsubject/:subjectName" element={<CRSubjectPage/>}/>
        <Route path="/CRtask/:id" element={<CRTaskPage/>}/>
        <Route path="/CRnotice/:id" element={<CRNoticePage/>}/>
        <Route path="/CRAddSubjectPage" element={<CRAddSubjectPage/>}/>
        <Route path="/CRAddTaskPage/:subjectName" element={<CRAddTaskPage/>}/>
        <Route path="/CRAddNoticePage" element={<CRAddNoticePage/>}/>
        <Route path="/CRAddPdfPage/:subjectName" element={<CRAddPdfPage/>}/>
        <Route path="/CRmanageStudent" element={<CRManageStudentPage/>}/>
        <Route path="/CRAddStudentPage" element={<CRAddStudentPage/>}/>
        <Route path="/which" element={<AsStudentOrAsCrPage/>}/>
      </Routes>
    </>
  );
}

export default App;