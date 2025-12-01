import React from "react";

export default function ProjectItem({ project }) {
  if (!project) return null;

  return (
    <div className="project">
      <h3 className="project-title">{project.title}</h3>

      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      {project.tech && project.tech.length > 0 && (
        <ul className="project-tech">
          {project.tech.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}

      {project.link && (
        <p className="project-link">
          <a href={project.link} target="_blank" rel="noreferrer">
            View project
          </a>
        </p>
      )}
    </div>
  );
}