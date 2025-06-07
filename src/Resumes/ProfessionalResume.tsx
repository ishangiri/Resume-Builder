import { forwardRef } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useThemeStore } from '../store/themeStores/ProfessionalthemeStore';


const ProfessionalTemplate = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const resumeData = useResumeData();
    const { theme } = useThemeStore();
    
 
    return (
      <div
        {...props}
        ref={ref}
        className="flex-1 w-full h-full mx-auto overflow-hidden"
        style={{
          width: '210mm',
          height: '297mm',
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize,
          lineHeight: theme.lineHeight,
          padding: theme.spacing,
          borderRadius: theme.borderRadius,
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 mb-4 text-center">
          <h1
            className="font-bold"
            style={{
              fontSize: theme.headingSize,
              color: theme.textColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            {resumeData.personalInfo.name}
          </h1>
          <h2 className="font-mono" style={{ fontSize: theme.fontSize, color: theme.textColor }}>
            {resumeData.JobTitle}
          </h2>
          <div
            className="flex justify-center gap-4 text-xs"
            style={{ color: theme.secondaryTextColor }}
          >
            <span>{resumeData.personalInfo.email}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.linkedin}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </div>

        <hr className="mb-4" style={{ borderTop: `1px solid ${theme.dividerColor}` }} />

        {/* Professional Summary */}
        <section style={{ marginBottom: theme.sectionSpacing }}>
          <h3
            className="font-bold uppercase tracking-wider pb-1 mb-2"
            style={{
              fontSize: theme.fontSize,
              fontFamily: theme.headingFontFamily,
              color: theme.sectionHeadingColor,
              borderBottom: `2px solid ${theme.accentColor}`,
            }}
          >
            Summary
          </h3>
          <p>{resumeData.summary}</p>
        </section>

        {/* Experience */}
        {resumeData.hasExperience && (
          <section style={{ marginBottom: theme.sectionSpacing }}>
            <h3
              className="font-bold uppercase tracking-wider pb-1 mb-2"
              style={{
                fontSize: theme.fontSize,
                fontFamily: theme.headingFontFamily,
                color: theme.sectionHeadingColor,
                borderBottom: `2px solid ${theme.accentColor}`,
              }}
            >
              Experience
            </h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-sm" style={{ color: theme.textColor }}>
                    {exp.title}
                  </h4>
                  <span className="text-xs" style={{ color: theme.secondaryTextColor }}>
                    {exp.period}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <h5 className="font-medium text-sm" style={{ color: theme.textColor }}>
                    {exp.company}
                  </h5>
                  <span className="text-xs" style={{ color: theme.secondaryTextColor }}>
                    {exp.location}
                  </span>
                </div>
                <ul className="ml-4" style={{ listStyleType: theme.bulletStyle }}>
                  {exp.description?.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        <section style={{ marginBottom: theme.sectionSpacing }}>
          <h3
            className="font-bold uppercase tracking-wider pb-1 mb-2"
            style={{
              fontSize: theme.fontSize,
              fontFamily: theme.headingFontFamily,
              color: theme.sectionHeadingColor,
              borderBottom: `2px solid ${theme.accentColor}`,
            }}
          >
            Education
          </h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold text-sm" style={{ color: theme.textColor }}>
                  {edu.degree}
                </h4>
                <span className="text-xs" style={{ color: theme.secondaryTextColor }}>
                  {edu.period}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h5 className="font-medium text-sm" style={{ color: theme.textColor }}>
                  {edu.institution}
                </h5>
                <span className="text-xs" style={{ color: theme.secondaryTextColor }}>
                  {edu.location}
                </span>
              </div>
              {edu.details && <p>{edu.details}</p>}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: theme.sectionSpacing }}>
          <h3
            className="font-bold uppercase tracking-wider pb-1 mb-2"
            style={{
              fontSize: theme.fontSize,
              fontFamily: theme.headingFontFamily,
              color: theme.sectionHeadingColor,
              borderBottom: `2px solid ${theme.accentColor}`,
            }}
          >
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-x-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <span className="font-medium text-sm" style={{ color: theme.textColor }}>
                  {skill.category}:
                </span>
                <span className="ml-1">{skill.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {resumeData.hasCerifications && (
          <section style={{ marginBottom: theme.sectionSpacing }}>
            <h3
              className="font-bold uppercase tracking-wider pb-1 mb-2"
              style={{
                fontSize: theme.fontSize,
                fontFamily: theme.headingFontFamily,
                color: theme.sectionHeadingColor,
                borderBottom: `2px solid ${theme.accentColor}`,
              }}
            >
              Certifications
            </h3>
            <ul className="ml-4" style={{ listStyleType: theme.bulletStyle }}>
              {resumeData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {resumeData.hasProjects && (
          <section>
            <h3
              className="font-bold uppercase tracking-wider pb-1 mb-2"
              style={{
                fontSize: theme.fontSize,
                fontFamily: theme.headingFontFamily,
                color: theme.sectionHeadingColor,
                borderBottom: `2px solid ${theme.accentColor}`,
              }}
            >
              Projects
            </h3>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-1 text-sm">
                <span className="font-medium" style={{ color: theme.textColor }}>
                  {project.name}:
                </span>
                <span className="ml-1" style={{ color: theme.textColor }}>
                  {project.description}
                </span>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }
);

ProfessionalTemplate.displayName = 'ProfessionalTemplate';
export default ProfessionalTemplate;