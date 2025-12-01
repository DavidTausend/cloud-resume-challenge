import React from "react";

export default function ResumeHeader({ person }) {
  if (!person) return null;

  return (
    <header>
      <h1>{person.name}</h1>
      <p>
        {person.addressLine} &bull;{" "}
        <a href={`mailto:${person.email}`}>{person.email}</a>{" "}
        &bull; {person.phone}
      </p>
    </header>
  );
}