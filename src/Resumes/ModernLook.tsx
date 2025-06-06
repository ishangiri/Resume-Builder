import { useResumeData } from "../hooks/useResumeData";
import React from "react";
import { useModernLookthemeStore } from "../store/themeStores/ModernLookthemestore";
import type { GenericTheme } from "../types/GenericTheme";

interface ModernLookProps {
  sectionSpacing?: string;
  headerColor?: string;
  accentColor?: string;
}

const ModernLook = React.forwardRef<HTMLDivElement, ModernLookProps>(({ sectionSpacing, headerColor, accentColor }, ref) => {
  const resumeData = useResumeData();
  const { theme } = useModernLookthemeStore();

  const effectiveAccentColor = accentColor || theme.accentColor;
  const effectiveHeaderColor = headerColor || theme.headerColor;
  const effectiveSectionSpacing = sectionSpacing || theme.sectionSpacing;

  return (
    <div
      ref={ref}
      className={`p-8 flex-1 w-full h-full mx-auto`}
      style={{ width: "210mm", height: "297mm", color: theme.textColor, fontSize: theme.fontSize, fontFamily: theme.fontFamily, backgroundColor : theme.backgroundColor}}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className={`text-4xl font-bold tracking-wide uppercase`}
             style={{ color: theme.primaryColor }}
        >
          {resumeData.personalInfo.name}
        </h1>
        <h2 className="text-base font-medium text-gray-700">
          {resumeData.JobTitle}
        </h2>
        <p className="text-gray-700 text-sm mt-1">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{" "}
          {resumeData.personalInfo.location} | {resumeData.personalInfo.linkedin}
        </p>

      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: effectiveSectionSpacing }}>
        <Section title="Summary" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
          <p className="leading-snug">{resumeData.summary}</p>
        </Section>

        <Section title="Key Skills" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {resumeData.skills.map((skill, i) => (
              <div key={i}>
                <div style={{ color: effectiveAccentColor }} className="font-medium">
                  {skill.category + " :"}
                </div>
                <div>{skill.skills || skill}</div>
              </div>
            ))}
          </div>
        </Section>

        {resumeData.hasExperience && <Section title="Work Experience" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
          {resumeData.experience.map((job, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold" style={{ color: theme.primaryColor }}>
                  {job.title}, {job.company}
                </h4>
                <span className="text-xs text-gray-700 font-medium">
                  {job.period}
                </span>
              </div>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 leading-tight">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>}

        <Section title="Education" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold" style={{ color: theme.primaryColor }}>{edu.degree}</h4>
                <span className="text-xs text-gray-700">{edu.period}</span>
              </div>
              <p className="text-xs text-gray-700">{edu.institution}</p>
              {edu.details && (
                <ul className="list-disc pl-4 mt-1 space-y-0.5 leading-tight">
                  {(Array.isArray(edu.details) ? edu.details : [edu.details]).map(
                    (detail, j) => <li key={j}>{detail}</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </Section>

        {resumeData.projects?.length > 0 && (
          <Section title="Projects" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
            <ul className="list-disc pl-4 space-y-0.5 leading-tight">
              {resumeData.projects.map((project, i) => (
                <div key={i} className="mb-2">
                  <li>
                    <span style={{ color: effectiveAccentColor }} className="font-medium">
                      {project.name + ": "}
                    </span>
                    {project.description}
                  </li>
                </div>
              ))}
            </ul>
          </Section>
        )}

        {resumeData.certifications?.length > 0 && (
          <Section title="Certifications" headerColor={effectiveHeaderColor} accentColor={effectiveAccentColor} theme={theme}>
            <ul className="list-disc pl-4 space-y-0.5 leading-tight">
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
  headerColor,
  accentColor,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  headerColor?: string;
  accentColor?: string;
  theme : GenericTheme
}) => {
  return (
    <div className="flex">
      <h3 className="w-1/4 pr-3 font-bold text-sm uppercase tracking-wide"
           style={{ color: headerColor || theme.headerColor }}
      >
        {title}
      </h3>
      <div 
        className="w-3/4 border-l-2 pl-4" 
        style={{ borderLeftColor: accentColor || theme.accentColor }}
      >
        {children}
      </div>
    </div>
  );
};

export default ModernLook;