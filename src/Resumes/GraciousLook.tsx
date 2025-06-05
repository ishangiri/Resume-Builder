import React from "react";
import { useResumeData } from "../hooks/useResumeData";
import { useThemeStore } from "../store/themeStores/GraciousthemeStore";

const GraciousLook = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  const { theme } = useThemeStore();

  return (
    <div
      ref={ref}
      className="p-8 flex-1 w-full h-full mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        padding: theme.spacing,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          borderBottom: "1px solid #d1d5db",
          paddingBottom: "0.5rem",
        }}
      >
        <h1
          style={{
            fontSize: theme.headingSize,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: theme.textColor,
          }}
        >
          {resumeData.personalInfo.name} | {resumeData.JobTitle || "PROFESSIONAL TITLE"}
        </h1>
        <p>
          {resumeData.personalInfo.location && `${resumeData.personalInfo.location} | `}
          {resumeData.personalInfo.phone && `${resumeData.personalInfo.phone} | `}
          {resumeData.personalInfo.email}
        </p>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <section style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              backgroundColor: theme.sectionTitleBg,
              color: theme.sectionTitleTextColor,
              textAlign: "center",
              padding: "0.25rem",
              textTransform: "uppercase",
              fontSize: theme.fontSize,
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Professional Summary
          </h3>
          <p style={{ textAlign: "center" }}>{resumeData.summary}</p>
        </section>
      )}

      {/* Skills */}
      <section style={{ marginBottom: "0.75rem" }}>
        <h3
          style={{
            backgroundColor: theme.sectionTitleBg,
            color: theme.sectionTitleTextColor,
            textAlign: "center",
            padding: "0.25rem",
            textTransform: "uppercase",
            fontSize: theme.fontSize,
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Core Competencies
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {resumeData.skills.map((group, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              <span style={{ fontWeight: 600 }}>{group.category}:</span>
              <span>{group.skills}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "0.75rem" }}>
        <h3
          style={{
            backgroundColor: theme.sectionTitleBg,
            color: theme.sectionTitleTextColor,
            textAlign: "center",
            padding: "0.25rem",
            textTransform: "uppercase",
            fontSize: theme.fontSize,
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Professional Experience
        </h3>
        {resumeData.experience.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ fontWeight: 600 }}>{job.company}</h4>
              <span style={{ fontSize: "0.75rem" }}>{job.period}</span>
            </div>
            <p style={{ fontSize: "0.75rem", fontStyle: "italic" }}>{job.title}</p>
            <ul style={{ marginLeft: "1rem", paddingLeft: "1rem", listStyleType: "disc" }}>
              {job.description.slice(0, 3).map((desc, i) => (
                <li key={i} style={{ marginBottom: "0.25rem" }}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <section style={{ marginBottom: "0.75rem" }}>
          <h3
            style={{
              backgroundColor: theme.sectionTitleBg,
              color: theme.sectionTitleTextColor,
              textAlign: "center",
              padding: "0.25rem",
              textTransform: "uppercase",
              fontSize: theme.fontSize,
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Relevant Projects
          </h3>
          {resumeData.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: "0.5rem" }}>
              <h4 style={{ fontWeight: 600 }}>{project.name || `Project ${i + 1}`}</h4>
              <p style={{ fontSize: "0.75rem" }}>{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      <section style={{ marginBottom: "0.75rem" }}>
        <h3
          style={{
            backgroundColor: theme.sectionTitleBg,
            color: theme.sectionTitleTextColor,
            textAlign: "center",
            padding: "0.25rem",
            textTransform: "uppercase",
            fontSize: theme.fontSize,
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Education
        </h3>
        {resumeData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <h4 style={{ fontWeight: 600 }}>
              {edu.period} | {edu.institution}
            </h4>
            <p style={{ fontSize: "0.75rem", fontStyle: "italic" }}>{edu.degree}</p>
            {edu.details && (
              <ul style={{ marginLeft: "1rem", paddingLeft: "1rem", listStyleType: "disc" }}>
                <li>{edu.details}</li>
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <section style={{ marginBottom: "0.75rem" }}>
          <h3
            style={{
              backgroundColor: theme.sectionTitleBg,
              color: theme.sectionTitleTextColor,
              textAlign: "center",
              padding: "0.25rem",
              textTransform: "uppercase",
              fontSize: theme.fontSize,
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Certifications
          </h3>
          <ul style={{ marginLeft: "1rem", paddingLeft: "1rem", listStyleType: "disc" }}>
            {resumeData.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

export default GraciousLook;
