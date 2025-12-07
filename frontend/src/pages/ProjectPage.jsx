import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import rawProjectsData from "data/projectsData.json";
import "css/pages/projects.css";
import ProjectItem from "comps/ProjectItem";

const projects = Array.isArray(rawProjectsData)
  ? rawProjectsData
  : rawProjectsData.projects || [];

export default function ProjectPage() {
  const { handle } = useParams();
  const project = projects.find((p) => p.handle === handle);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} – Projekte – David Tausend`;
    } else {
      document.title = "Projekt nicht gefunden – David Tausend";
    }
  }, [project]);

  if (!project) {
    return (
      <div className="project-page">
        <header className="project-page__header">
          <h1>Projekt nicht gefunden</h1>
          <p>
            Für den Handle <code>{handle}</code> wurde kein Projekt gefunden.
          </p>
        </header>
        <p className="project-page__back">
          <Link to="/projects">← Zurück zur Projektübersicht</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="project-page">
      <header className="project-page__header">
        <h1>{project.title}</h1>
        {project.description && (
          <p className="project-page__subtitle">{project.description}</p>
        )}
      </header>

      <ProjectItem project={project} />

      <p className="project-page__back">
        <Link to="/projects">← Zurück zur Projektübersicht</Link>
      </p>
    </div>
  );
}