import React from "react";

export default function ResumeSectionItem({ item }) {
  const { title, subtitle, location, duration, bullets } = item;

  return (
    <div className="item">
      <div className="info">
        {title && <h3>{title}</h3>}
        {subtitle && <p>{subtitle}</p>}
      </div>

      {(location || duration) && (
        <div className="details">
          {location && <div className="location">{location}</div>}
          {duration && <div className="duration">{duration}</div>}
        </div>
      )}

      {bullets && bullets.length > 0 && (
        <ul>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}