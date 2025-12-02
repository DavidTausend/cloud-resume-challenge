import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "css/pages/projects.css";
import projectsData from "data/projectsData.json";
import ProjectItem from "comps/ProjectItem";

export default function ProjectPage() {
  const { handle } = useParams();
  const project = projectsData.find((p) => p.handle === handle);

  // Dynamic page title
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} – Projekte – David Tausend`;
    } else {
      document.title = "Projekt nicht gefunden – David Tausend";
    }
  }, [project]);

  // Handle invalid /projects/:handle
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

      {/* Reuse the card component for consistent look */}
      <ProjectItem project={project} />

      <p className="project-page__back">
        <Link to="/projects">← Zurück zur Projektübersicht</Link>
      </p>
    </div>
  );
}