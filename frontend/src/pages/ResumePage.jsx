import React from "react";
import "css/pages/resume.css";

import resumeData from "data/resumeData";
import ResumeHeader from "comps/resume/ResumeHeader";
import ResumeSection from "comps/resume/ResumeSection";

export default function ResumePage() {
  const { personalInfo, sections } = resumeData;

  // Map raw data into the generic shape ResumeSectionItem expects
  const educationSection = {
    title: sections.education.title,
    items: sections.education.items.map((item) => ({
      title: item.school,
      subtitle: item.degree,
      location: item.location,
      duration: item.duration,
    })),
  };

  const experienceSection = {
    title: sections.experience.title,
    items: sections.experience.items.map((item) => ({
      title: item.role,
      subtitle: item.company,
      location: item.location,
      duration: item.duration,
      bullets: item.bullets,
    })),
  };

  const leadershipSection = {
    title: sections.leadership.title,
    items: sections.leadership.items.map((item) => ({
      title: item.name,
      subtitle: item.role,
      location: item.location,
      duration: item.duration,
    })),
  };

  const certificationsSection = {
    title: sections.certifications.title,
    items: sections.certifications.providers.map((provider) => ({
      title: provider.name,
      bullets: provider.certifications.map((cert) =>
        typeof cert === "string"
          ? cert
          : cert.validity
          ? `${cert.name} — ${cert.validity}`
          : cert.name
      ),
    })),
  };

  return (
    <>
      <ResumeHeader person={personalInfo} />

      <ResumeSection section={educationSection} />
      <ResumeSection section={experienceSection} />
      <ResumeSection section={leadershipSection} />
      <ResumeSection section={certificationsSection} />

    </>
  );
}