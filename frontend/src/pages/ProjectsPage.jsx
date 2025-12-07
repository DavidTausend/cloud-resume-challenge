import React, { useEffect } from "react";
import "css/pages/projects.css";
import rawProjectsData from "data/projectsData.json";
import ProjectItem from "comps/ProjectItem";

const projects = Array.isArray(rawProjectsData)
  ? rawProjectsData
  : rawProjectsData.projects || [];

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Projekte – David Tausend";
  }, []);

  return (
    <div className="projects-page">
      <header className="projects-page__header">
        <h1>Projekte</h1>
        <p>
          Eine Auswahl von persönlichen und beruflichen Projekten rund um Cloud,
          DevOps und Webentwicklung.
        </p>
      </header>

      {projects.length === 0 ? (
        <p>Es sind derzeit noch keine Projekte hinterlegt.</p>
      ) : (
        <div className="projects">
          {projects.map((project) => (
            <ProjectItem key={project.handle} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}