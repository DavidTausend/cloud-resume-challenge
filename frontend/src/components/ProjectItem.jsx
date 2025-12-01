import React from "react";
import { Link } from "react-router-dom";

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

      {/* Internal route to /projects/:handle */}
      <p className="project-link">
        <Link to={`/projects/${project.handle}`}>View project</Link>
      </p>
    </div>
  );
}