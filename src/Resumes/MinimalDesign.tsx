import React from "react";
import { useResumeData } from "../hooks/useResumeData";
import { useMinimalThemeStore } from "../store/themeStores/MinimalDesignthemestore";



const MinimalDesign = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  const {theme} = useMinimalThemeStore();


  return (
    <div
      ref={ref}
      className="p-6 mx-auto  text-gray-900 font-sans"
      style={{
        width: "210mm",
        height: "297mm",
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight,
        backgroundColor : theme.backgroundColor
      }}
    >
      {/* Header */}
      <div className="text-center">
        <h1
          className="font-bold uppercase tracking-wide"
          style={{ color: theme.headerColor, fontSize : theme.nameFontSize }}
        >
          {resumeData.personalInfo.name}
        </h1>
        <p className="text-sm" style={{ color: theme.textColor }}>
          {resumeData.personalInfo.location && `${resumeData.personalInfo.location} | `}
          {resumeData.personalInfo.email}
          {` | ${resumeData.personalInfo.phone}`}
          {resumeData.personalInfo.linkedin && ` | ${resumeData.personalInfo.linkedin}`}
        </p>
      </div>

      {/* Summary */}
      <section style={{marginBottom : theme.sectionSpacing}}>
        <h2
          className="font-semibold uppercase mb-1"
          style={{ color: theme.headerColor, fontSize : theme.headingSize}}
        >
          Summary
        </h2>
        <p  style={{ color: theme.textColor, fontSize : theme.fontSize }}>
          {resumeData.summary}
        </p>
      </section>

      {/* Experience */}
      <section style={{marginBottom : theme.sectionSpacing}}>
        <h2
          className="font-semibold uppercase mb-1"
          style={{ color: theme.headerColor,  fontSize : theme.headingSize }}
        >
          Work Experience
        </h2>
        {resumeData.experience.map((job, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-sm text-gray-900">
                {job.title} | {job.company}
              </h3>
              <span className="text-xs text-gray-600">{job.period}</span>
            </div>
            <ul className="list-disc ml-5  space-y-1" style={{ color: theme.textColor, fontSize : theme.fontSize}}>
              {job.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section style={{marginBottom : theme.sectionSpacing}}>
        <h2
          className="font-semibold uppercase mb-1"
          style={{ color: theme.headerColor,  fontSize : theme.headingSize }}
        >
          Skills
        </h2>
        <div className="space-y-3">
          {resumeData.skills.map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-gray-700">{group.category}</h3>
              <div className="flex mt-1">
                    {group.skills}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{marginBottom : theme.sectionSpacing}}>
        <h2
          className="font-semibold uppercase mb-1"
          style={{ color: theme.headerColor,  fontSize : theme.headingSize }}
        >
          Education
        </h2>
        {resumeData.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-sm text-gray-900">
                {edu.degree} | {edu.institution}
              </h3>
              <span className="text-xs text-gray-600">{edu.period}</span>
            </div>
            {edu.details && (
              <ul className="list-disc ml-5 space-y-1" style={{ color: theme.textColor, fontSize : theme.fontSize }}>
                {Array.isArray(edu.details)
                  ? edu.details.map((detail, j) => <li key={j}>{detail}</li>)
                  : <li>{edu.details}</li>}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <section style={{marginBottom : theme.sectionSpacing}}>
          <h2
            className="font-semibold uppercase mb-1"
            style={{ color: theme.headerColor,  fontSize : theme.headingSize }}
          >
            Projects
          </h2>
          <ul className="list-disc ml-5  space-y-1" style={{ color: theme.textColor, fontSize : theme.fontSize }}>
            {resumeData.projects.map((project, i) => (
              <li key={i}>{project.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <section>
          <h2
            className="font-semibold uppercase mb-1"
            style={{ color: theme.headerColor,  fontSize : theme.headingSize }}
          >
            Certifications
          </h2>
          <ul className="list-disc ml-5  space-y-1" style={{ color: theme.textColor, fontSize : theme.fontSize }}>
            {resumeData.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

export default MinimalDesign;
