import { useResumeData } from "../hooks/useResumeData";
import React from "react";

const ModernLook = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();

  return (
    <div
      ref={ref}
      className="p-8 flex-1 w-full h-full mx-auto bg-white text-gray-800 text-sm font-sans"
      style={{ width: "210mm", height: "297mm" }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-black tracking-wide uppercase">
          {resumeData.personalInfo.name}
        </h1>
        <h2 className="text-base font-medium text-gray-700">
          {resumeData.JobTitle}
        </h2>
        <p className="text-gray-700 text-sm mt-1">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{" "}
          {resumeData.personalInfo.location}
        </p>
      </div>

      {/* Two-column Sections */}
      <div className="space-y-4">
        {/* Summary */}
        <Section title="Summary">
          <p className="text-sm leading-snug">{resumeData.summary}</p>
        </Section>

        {/* Experience */}
        <Section title="Work Experience">
          {resumeData.experience.map((job, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold text-sm text-black">
                  {job.title}, {job.company}
                </h4>
                <span className="text-xs text-gray-700 font-medium">
                  {job.period}
                </span>
              </div>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-sm text-gray-700 leading-tight">
                {job.descriptions.map((desc, i) => (
                  <li key={i}> {desc} </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Education */}
        <Section title="Education">
          {resumeData.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold text-sm text-black">
                  {edu.degree}
                </h4>
                <span className="text-xs text-gray-700">{edu.period}</span>
              </div>
              <p className="text-xs text-gray-700">{edu.institution}</p>
              {edu.details && (
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-sm text-gray-700 leading-tight">
                  {(Array.isArray(edu.details) ? edu.details : [edu.details]).map(
                    (detail, j) => <li key={j}>{detail}</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Key Skills">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
            {resumeData.skills.map((skill, i) => (
                <div key={i}>
              <div> {skill.category + " :"} </div>
              <div>• {skill.skills || skill}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        {resumeData.projects?.length > 0 && (
          <Section title="Projects">
            <ul className="list-disc pl-4 space-y-0.5 text-sm text-gray-700 leading-tight">
              {resumeData.projects.map((project, i) => (
                <div className="mb-2">
                <li key={i}>{project.name + ": "}{project.description}</li>
                </div>
              ))}
            </ul>
          </Section>
        )}

        {/* Certifications */}
        {resumeData.certifications?.length > 0 && (
          <Section title="Certifications">
            <ul className="list-disc pl-4 space-y-0.5 text-sm text-gray-700 leading-tight">
              {resumeData.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
});

// Subcomponent for consistent section layout
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex">
    <h3 className="w-1/4 pr-3 font-bold text-sm text-black uppercase tracking-wide">
      {title}
    </h3>
    <div className="w-3/4 border-l-2 border-gray-300 pl-4">{children}</div>
  </div>
);

export default ModernLook;
