import { useResumeData } from "../hooks/useResumeData";
import React from "react";

const GraciousLook = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();

  return (
    <div
      ref={ref}
      className="p-3 mx-auto bg-white text-gray-900 font-sans text-sm leading-tight"
      style={{ width: "210mm", height: "297mm", overflow: "hidden" }}
    >
      {/* Header */}
      <div className="text-center mb-4 border-b border-gray-300 pb-2">
        <h1 className="text-xl font-bold uppercase tracking-wide text-gray-800">
          {resumeData.personalInfo.name} | {resumeData.JobTitle || "PROFESSIONAL TITLE"}
        </h1>
        <p className="text-gray-700">
          {resumeData.personalInfo.location && `${resumeData.personalInfo.location} | `}
          {resumeData.personalInfo.phone && `${resumeData.personalInfo.phone} | `}
          {resumeData.personalInfo.email}
        </p>
      </div>

      {/* Summary */}
      <section className="mb-3">
        <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-2">
          Professional Summary
        </h3>
        <p className="text-center">{resumeData.summary}</p>
      </section>

      {/* Skills */}
 <section className="mb-2">
  <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-1">
    Core Competencies
  </h3>
  <div className="space-y-1 text-sm text-gray-800">
    {resumeData.skills.map((group, i) => (
      <div key={i} className="flex flex-wrap gap-1">
        <span className="font-semibold">{group.category}:</span>
          <span  className="flex items-center gap-1">
            <span>{group.skills}</span>
          </span>
      </div>
    ))}
  </div>
</section>

      {/* Experience */}
      <section className="mb-3">
        <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-2">
          Professional Experience
        </h3>
        {resumeData.experience.map((job, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex justify-between">
              <h4 className="font-semibold">{job.company}</h4>
              <span className="text-xs">{job.period}</span>
            </div>
            <p className="text-xs italic">{job.title}</p>
            <ul className="list-disc ml-5 space-y-0.5">
              {job.descriptions.slice(0, 3).map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-2">
            Relevant Projects
          </h3>
          {resumeData.projects.map((project, i) => (
            <div key={i} className="mb-1">
              <h4 className="font-semibold">{project.name || `Project ${i + 1}`}</h4>
              <p className="text-xs">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      <section className="mb-3">
        <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-2">
          Education
        </h3>
        {resumeData.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <h4 className="font-semibold">{edu.period} | {edu.institution}</h4>
            <p className="text-xs italic">{edu.degree}</p>
            {edu.details && (
              <ul className="list-disc ml-5 space-y-0.5">
                 
                    <li>{edu.details}</li>
              
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-bold text-center bg-green-100 py-1 uppercase text-xs tracking-wide mb-2">
            Certifications
          </h3>
          <ul className="list-disc ml-5 space-y-0.5">
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
