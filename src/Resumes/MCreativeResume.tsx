import React from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useThemeStore } from '../store/themeStores/CreativeResumethemestore';

const ResumeTemplate = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  const { theme } = useThemeStore();

  return (
    <div 
      ref={ref} 
      className="flex w-full h-full font-sans" 
      style={{ 
        width: '210mm', 
        height: '297mm',
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
        lineHeight: theme.lineHeight
      }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-2/5 text-white space-y-4" 
        style={{ 
          backgroundColor: theme.accentColor,
          padding: theme.spacing
        }}
      >
        <div 
          className="font-bold tracking-wider"
          style={{
            fontSize: theme.headingSize,
            fontFamily: theme.headingFontFamily,
            color: theme.sectionTitleTextColor || '#ffffff'
          }}
        >
          {resumeData.personalInfo.name}
        </div>
        
        <section style={{ marginBottom: theme.sectionSpacing }}>
          {resumeData.hasProjects && (
            <h3 
              className="font-bold mb-2 tracking-wide"
              style={{
                fontSize: theme.fontSize,
                fontFamily: theme.headingFontFamily,
                color: theme.sectionTitleTextColor || '#ffffff'
              }}
            >
              Projects
            </h3>
          )}
          <div className="space-y-3">
            {resumeData.projects.map((achievement, index) => (
              <div key={index}>
                <h4 
                  className="font-semibold mb-1"
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.subtleTextColor || '#e0f2fe'
                  }}
                >
                  {achievement.name}
                </h4>
                <p 
                  className="leading-tight"
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.mediumTextColor || '#f0f9ff'
                  }}
                >
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: theme.sectionSpacing }}>
          <h3 
            className="font-bold mb-2 tracking-wide"
            style={{
              fontSize: theme.fontSize,
              fontFamily: theme.headingFontFamily,
              color: theme.sectionTitleTextColor || '#ffffff'
            }}
          >
            SKILLS
          </h3>
          <div className="space-y-1">
            {resumeData.skills.map((skill, index) => (
              <div key={index}>
                <div 
                  className="font-semibold"
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.subtleTextColor || '#e0f2fe'
                  }}
                >
                  {skill.category}
                </div>
                <div 
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.mediumTextColor || '#f0f9ff'
                  }}
                >
                  {skill.skills}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: theme.sectionSpacing }}>
          {resumeData.hasCerifications && (
            <h3 
              className="font-bold mb-2 tracking-wide"
              style={{
                fontSize: theme.fontSize,
                fontFamily: theme.headingFontFamily,
                color: theme.sectionTitleTextColor || '#ffffff'
              }}
            >
              CERTIFICATION
            </h3>
          )}
          <div className="space-y-2">
            <div>
              <h4 
                className="font-semibold"
                style={{
                  fontSize: theme.fontSize,
                  color: theme.subtleTextColor || '#e0f2fe'
                }}
              >
                {...resumeData.certifications}
              </h4>
            </div>
          </div>
        </section>
      </div>

      {/* Right Main Content */}
      <div 
        className="w-3/5 space-y-4" 
        style={{ 
          backgroundColor: theme.backgroundColor,
          padding: theme.spacing,
          color: theme.textColor
        }}
      >
        <div 
          className="border-b pb-2"
          style={{ borderColor: theme.dividerColor || '#e5e7eb' }}
        >
          <h1 
            className="font-bold mb-1"
            style={{
              fontSize: theme.headingSize,
              color: theme.accentColor,
              fontFamily: theme.headingFontFamily
            }}
          >
            {resumeData.JobTitle}
          </h1>
          <div 
            className="flex items-center space-x-3"
            style={{
              fontSize: theme.fontSize,
              color: theme.secondaryTextColor || theme.textColor
            }}
          >
            <span>📧 Email</span>
            <span>🔗 {resumeData.personalInfo.email}</span>
            <span>📍 {resumeData.personalInfo.location}</span>
            <span>🌐 {resumeData.personalInfo.linkedin}</span>
          </div>
        </div>

        <section style={{ marginBottom: theme.sectionSpacing }}>
          <h2 
            className="font-bold mb-2"
            style={{
              fontSize: theme.fontSize,
              color: theme.sectionHeadingColor || theme.textColor,
              fontFamily: theme.headingFontFamily
            }}
          >
            SUMMARY
          </h2>
          <p 
            className="leading-tight"
            style={{
              fontSize: theme.fontSize,
              color: theme.textColor
            }}
          >
            {resumeData.summary}
          </p>
        </section>

        <section style={{ marginBottom: theme.sectionSpacing }}>
          {resumeData.hasExperience && (
            <h2 
              className="font-bold mb-3"
              style={{
                fontSize: theme.fontSize,
                color: theme.sectionHeadingColor || theme.textColor,
                fontFamily: theme.headingFontFamily
              }}
            >
              EXPERIENCE
            </h2>
          )}
          <div className="space-y-4">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="font-semibold"
                      style={{
                        fontSize: theme.fontSize,
                        color: theme.textColor
                      }}
                    >
                      {job.title}
                    </h3>
                    {job.company && (
                      <p 
                        className="font-medium"
                        style={{
                          fontSize: theme.fontSize,
                          color: theme.accentColor
                        }}
                      >
                        {job.company}
                      </p>
                    )}
                  </div>
                  <div 
                    className="text-right"
                    style={{
                      fontSize: theme.fontSize,
                      color: theme.secondaryTextColor || theme.textColor
                    }}
                  >
                    <p>{job.period}</p>
                    {job.location && <p>{job.location}</p>}
                  </div>
                </div>
                {job.description && (
                  <ul className="space-y-1 ml-3" style={{ listStyleType: theme.bulletStyle || 'disc' }}>
                    {job.description.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span 
                          className="mr-2 mt-0.5"
                          style={{
                            color: theme.accentColor,
                            fontSize: theme.fontSize
                          }}
                        >
                          •
                        </span>
                        <span 
                          className="leading-tight"
                          style={{
                            fontSize: theme.fontSize,
                            color: theme.textColor
                          }}
                        >
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 
            className="font-bold mb-3"
            style={{
              fontSize: theme.fontSize,
              color: theme.sectionHeadingColor || theme.textColor,
              fontFamily: theme.headingFontFamily
            }}
          >
            EDUCATION
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 
                    className="font-semibold"
                    style={{
                      fontSize: theme.fontSize,
                      color: theme.textColor
                    }}
                  >
                    {edu.degree}
                  </h3>
                  {edu.institution && (
                    <p 
                      className="font-medium"
                      style={{
                        fontSize: theme.fontSize,
                        color: theme.accentColor
                      }}
                    >
                      {edu.institution}
                    </p>
                  )}
                </div>
                <div 
                  className="text-right"
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.secondaryTextColor || theme.textColor
                  }}
                >
                  <p>{edu.period}</p>
                  {edu.location && <p>{edu.location}</p>}
                </div>
              </div>
              {edu.details && (
                <p 
                  className="leading-tight"
                  style={{
                    fontSize: theme.fontSize,
                    color: theme.textColor
                  }}
                >
                  {edu.details}
                </p>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
});

ResumeTemplate.displayName = 'ResumeTemplate';
export default ResumeTemplate;
