import React, { useEffect } from "react";
import "css/pages/projects.css";
import projectsData from "data/projectsData";
import ProjectItem from "comps/ProjectItem";

export default function ProjectsPage() {
  // Set browser tab title when this page is active
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

      {projectsData.length === 0 ? (
        <p>Es sind derzeit noch keine Projekte hinterlegt.</p>
      ) : (
        <div className="projects">
          {projectsData.map((project) => (
            <ProjectItem key={project.handle} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}