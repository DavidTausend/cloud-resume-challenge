import React from "react";
import ResumeSectionItem from "./ResumeSectionItem";

export default function ResumeSection({ section }) {
  if (!section) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>

      <div className="items">
        {section.items &&
          section.items.map((item, index) => (
            <ResumeSectionItem key={index} item={item} />
          ))}
      </div>
    </section>
  );
}