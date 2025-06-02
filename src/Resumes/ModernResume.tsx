// ModernTemplateDynamic.tsx - Fixed and Simplified
import React, { forwardRef } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useThemeStore } from '../store/themeStores/ModernResumethemeStore';


const ModernTemplate = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const resumeData = useResumeData();
    const { theme } = useThemeStore();

    return (
      <div
        {...props}
        ref={ref}
        className="flex-1 w-full h-full mx-auto"
        style={{
          width: '210mm',
          height: '297mm',
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize,
          lineHeight: theme.lineHeight,
          padding: theme.spacing,
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-bold" style={{ fontSize: theme.headingSize, color: theme.nameColor }}>
            {resumeData.personalInfo.name}
          </h1>
          <div className="mt-0.5" style={{ color: theme.textColor }}>
            {resumeData.JobTitle}
          </div>
          <div className="text-sm mt-1 flex flex-wrap gap-x-4 gap-y-1" style={{ color: theme.subtleTextColor }}>
            <span>{resumeData.personalInfo.email}</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>{resumeData.personalInfo.linkedin}</span>
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Summary
            </h2>
            <p className="text-sm">{resumeData.summary}</p>
          </div>
        )}

        {/* Projects */}
        {resumeData.hasProjects && resumeData.projects && resumeData.projects.length > 0 && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Projects
            </h2>
            {resumeData.projects.map((proj, i) => (
              <div key={i} className="mb-2 text-sm">
                <span className="font-semibold" style={{ color: theme.textColor }}>{proj.name}:</span>{' '}
                <span style={{ color: theme.mediumTextColor }}>{proj.description}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {resumeData.skills.map((skillItem, i) => (
                <div key={i} className="mb-2">
                  <div className="text-sm font-semibold" style={{ color: theme.mediumTextColor }}>
                    {skillItem.skills?.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.hasExperience && resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Experience
            </h2>
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div className="font-semibold" style={{ color: theme.textColor }}>{exp.title}</div>
                  <div className="text-sm" style={{ color: theme.subtleTextColor }}>{exp.period}</div>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-sm" style={{ color: theme.mediumTextColor }}>{exp.company}</div>
                  <div className="text-sm" style={{ color: theme.subtleTextColor }}>{exp.location}</div>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-sm" style={{ color: theme.mediumTextColor }}>
                  {exp.descriptions?.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div className="font-medium" style={{ color: theme.textColor }}>{edu.degree}</div>
                  <div className="text-sm" style={{ color: theme.subtleTextColor }}>{edu.period}</div>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="text-sm" style={{ color: theme.mediumTextColor }}>{edu.institution}</div>
                  <div className="text-sm" style={{ color: theme.subtleTextColor }}>{edu.location}</div>
                </div>
                {edu.details && <p className="text-sm mt-1" style={{ color: theme.mediumTextColor }}>{edu.details}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.hasCerifications && resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mb-4">
            <h2 
              className="text-sm font-semibold pl-2 mb-3 border-l-4" 
              style={{
                color: theme.sectionTitleTextColor,
                borderLeftColor: theme.accentColor,
              }}
            >
              Certifications
            </h2>
            <ul className="list-disc ml-5 text-sm space-y-0.5" style={{ color: theme.mediumTextColor }}>
              {resumeData.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

ModernTemplate.displayName = 'ModernTemplate';
export default ModernTemplate;