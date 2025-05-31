import React from 'react';
import { useResumeData } from '../hooks/useResumeData';

const TemplateCreative = React.forwardRef<HTMLDivElement>((_, ref) => {

  const resumeData = useResumeData();

  return (
<div
  ref={ref}
  className="w-full max-w-[794px] mx-auto bg-white font-sans text-gray-900 p-8"
  style={{
    printColorAdjust: 'exact',
    WebkitPrintColorAdjust: 'exact',
    fontSize: '11px',             // Slightly smaller for print
    lineHeight: '1.4',
    height: '1122px',             // Limit to A4 height
    overflow: 'hidden',           // Prevent overflow
  }}
>
  {/* Header */}
  <div className="text-center mb-4 pb-2 border-b-2 border-blue-600">
    <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
    <p className="text-base text-blue-600 mb-2">{resumeData.JobTitle}</p>
    <div className="flex justify-center flex-wrap gap-x-2 text-sm text-gray-600">
      <span>{resumeData.personalInfo.linkedin}</span>
      <span>•</span>
      <span>{resumeData.personalInfo.email}</span>
      <span>•</span>
      <span>{resumeData.personalInfo.phone}</span>
      <span>•</span>
      <span>{resumeData.personalInfo.location}</span>
    </div>
  </div>

  {/* Summary */}
  <div className="mb-4 break-inside-avoid">
    <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Summary</h2>
    <p className="text-sm text-gray-700">{resumeData.summary}</p>
  </div>

  {/* Experience */}
  {resumeData.hasExperience && (
    <div className="mb-4 break-inside-avoid">
      <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Experience</h2>
      {resumeData.experience.slice(0, 3).map((exp, index) => ( // slice to limit entries
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-sm">{exp.title}</p>
              <p className="text-sm text-gray-700">{exp.company}</p>
            </div>
            <p className="text-sm text-gray-600">{exp.period}</p>
          </div>
          <ul className="list-disc pl-4 text-sm mt-1">
            {exp.descriptions.slice(0, 3).map((desc, i) => ( // limit bullet points
              <li key={i} className="text-gray-700">{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )}

  {/* Skills + Education */}
  <div className="grid grid-cols-2 gap-6 mb-4 break-inside-avoid">
    <div>
      <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Skills</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {resumeData.skills.slice(0, 6).map((skill, index) => (
          <li key={index}>
            <strong>{skill.category}</strong>{skill.category ? ': ' : ''}{skill.skills}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Education</h2>
      {resumeData.education.slice(0, 2).map((edu, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold text-sm">{edu.degree}</p>
          <p className="text-sm text-gray-700">{edu.institution}</p>
          <p className="text-sm text-gray-600">{edu.period}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Projects */}
  {resumeData.hasProjects && (
    <div className="mb-4 break-inside-avoid">
      <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Projects</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {resumeData.projects.slice(0, 3).map((project, index) => (
          <li key={index}><strong>{project.name}:</strong> {project.description}</li>
        ))}
      </ul>
    </div>
  )}

  {/* Certifications */}
  {resumeData.hasCerifications && (
    <div className="break-inside-avoid">
      <h2 className="text-sm font-bold text-blue-600 uppercase mb-1 border-b border-blue-200 pb-1">Certifications</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {resumeData.certifications.slice(0, 4).map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </div>
  )}
</div>
  );
});

TemplateCreative.displayName = 'TemplateCreative';

export default TemplateCreative;