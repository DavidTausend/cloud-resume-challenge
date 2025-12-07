import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx";
import HomePage from "pages/HomePage";
import ResumePage from "pages/ResumePage";
import ProjectsPage from "pages/ProjectsPage";
import ProjectPage from "pages/ProjectPage";
import PostPage from "pages/PostPage";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:handle" element={<ProjectPage />} />
          <Route path="/blog/:handle" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);