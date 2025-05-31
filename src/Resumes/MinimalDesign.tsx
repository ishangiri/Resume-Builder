import { useResumeData } from "../hooks/useResumeData"
import React from "react";

const MinimalDesign = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  
  return (
    <div
      ref={ref}
      className="p-6 mx-auto bg-white text-gray-900 font-sans"
      style={{ width: "210mm", height: "297mm", fontSize: "12px", lineHeight: "1.6" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 uppercase tracking-wide mb-1">
          {resumeData.personalInfo.name}
        </h1>
        <p className="text-gray-700 text-sm">
          {resumeData.personalInfo.location && `${resumeData.personalInfo.location} | `}
          {resumeData.personalInfo.email}
          {` | ${resumeData.personalInfo.phone}`}
          {resumeData.personalInfo.linkedin && ` | ${resumeData.personalInfo.linkedin}`}
        </p>
      </div>

      {/* Summary */}
      <section className="mb-5">
        <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Summary</h2>
        <p className="text-gray-800 text-sm">{resumeData.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Work Experience</h2>
        {resumeData.experience.map((job, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 text-sm">
                {job.title} | {job.company}
              </h3>
              <span className="text-gray-600 text-xs">{job.period}</span>
            </div>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              {job.descriptions.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
 <section className="mb-5">
  <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Skills</h2>
  <div className="space-y-3">
    {resumeData.skills.map((group, i) => (
      <div className="flex flex-row gap-2" key={i}>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">{group.category}</h3>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill: string, j: number) => (
            <span
              key={j}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Education */}
      <section className="mb-5">
        <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Education</h2>
        {resumeData.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 text-sm">
                {edu.degree} | {edu.institution}
              </h3>
              <span className="text-gray-600 text-xs">{edu.period}</span>
            </div>
            {edu.details && (
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
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
        <section className="mb-5">
          <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Projects</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {resumeData.projects.map((project, i) => (
              <li key={i}>{project.description}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <section className="mb-0">
          <h2 className="text-md font-semibold text-blue-600 uppercase mb-2">Certifications</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
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
