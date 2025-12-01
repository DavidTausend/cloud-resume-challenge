import React from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "data/projectsData";
import "css/pages/projects.css";
import ProjectItem from "comps/ProjectItem";

export default function ProjectPage() {
  const { handle } = useParams();
  const project = projectsData.find((p) => p.handle === handle);

  if (!project) {
    return (
      <>
        <p>Projekt nicht gefunden.</p>
        <p>
          <Link to="/projects">Zurück zu den Projekten</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <ProjectItem project={project} />
      <p>
        <Link to="/projects">← Zurück zu den Projekten</Link>
      </p>
    </>
  );
}