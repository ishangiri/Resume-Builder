import React, { type CSSProperties } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useThemeStore } from '../store/themeStores/CreativeResumethemestore';
import { Link, Locate, Mail, Phone } from 'lucide-react';

const HarvardResume = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  const theme = useThemeStore((state) => state.theme);

  // CSS variables for dynamic theme and spacing
  const cssVars: React.CSSProperties = {
    '--background-color': theme.backgroundColor,
    '--text-color': theme.textColor,
    '--secondary-text-color': theme.secondaryTextColor,
    '--accent-color': theme.accentColor,
    '--divider-color': theme.dividerColor,
    '--padding': theme.padding,
    '--section-spacing': theme.sectionSpacing,
    '--gap': theme.gap,
    '--item-spacing': theme.itemSpacing,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    padding: 'var(--padding)',
    width: '210mm',
    height: '297mm',
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className="mx-auto shadow-lg font-sans"
      style={cssVars}
    >
      {/* Header */}
      <header style={{ marginBottom: 'var(--section-spacing)' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1
              className="font-extrabold tracking-tight"
              style={{
                fontSize: theme.headingSize,
                color: theme.accentColor,
                fontFamily: theme.headingFontFamily,
              }}
            >
              {resumeData.personalInfo.name}
            </h1>
            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm justify-center items-center"
                 style={{ color: 'var(--secondary-text-color)' }}>
              <span><Locate className='w-4 h-4' style={{color : theme.accentColor}}/></span><span>{resumeData.personalInfo.location}</span>
               <span><Mail className='w-4 h-4' style={{color : theme.accentColor}}/></span> <span>{resumeData.personalInfo.email}</span>
              {resumeData.personalInfo.phone &&  <div className='flex mt-1 flex-wrap gap-x-2 gap-y-1 text-sm justify-center items-center'> <span><Phone className='w-4 h-4 ' style={{color : theme.accentColor}}/></span> <span>{resumeData.personalInfo.phone}</span> </div>}
              {resumeData.personalInfo.linkedin && <div className='flex mt-1 flex-wrap gap-x-2 gap-y-1 text-sm items-center justify-center'>  <span><Link className='w-4 h-4 'style={{color : theme.accentColor}}/></span> <span>{resumeData.personalInfo.linkedin}</span> </div>}
            </div>
          </div>
          <div className="mt-3 md:mt-0 text-right">
            <span
              className="text-xs font-medium tracking-wide uppercase"
              style={{ color: 'var(--accent-color)', letterSpacing: '0.08em' }}
            >
              {resumeData.JobTitle}
            </span>
          </div>
        </div>
      </header>

      {/* Education at Top */}
      <section style={{ marginBottom: 'var(--section-spacing)' }}>
        <h2
          className="font-bold uppercase tracking-widest mb-2"
          style={{
            fontSize: theme.sectionTitleSize,
            color: theme.accentColor,
            fontFamily: theme.headingFontFamily,
          }}
        >
          Education
        </h2>
        <div>
          {resumeData.education.map((edu, i) => (
            <div key={i}
              className="flex justify-between items-baseline"
              style={{ marginBottom: i < resumeData.education.length - 1 ? 'var(--item-spacing)' : 0 }}
            >
              <div>
                <span className="font-semibold">{edu.degree}</span>
                <span className="ml-2" style={{ color: 'var(--secondary-text-color)' }}>
                  {edu.institution}
                </span>
                {edu.details && (
                  <div className="text-xs mt-1" style={{ color: 'var(--secondary-text-color)' }}>
                    {edu.details}
                  </div>
                )}
              </div>
              <div className="text-xs text-right" style={{ color: 'var(--secondary-text-color)' }}>
                {edu.period}
                {edu.location && <span className="ml-2">{edu.location}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary/Profile */}
      <section style={{ marginBottom: 'var(--section-spacing)' }}>
        <h2
          className="font-bold uppercase tracking-widest mb-2"
          style={{
            fontSize: theme.sectionTitleSize,
            color: theme.accentColor,
            fontFamily: theme.headingFontFamily,
          }}
        >
          Profile
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}>
          {resumeData.summary}
        </p>
      </section>

      {/* Experience */}
      {resumeData.hasExperience && (
        <section style={{ marginBottom: 'var(--section-spacing)' }}>
          <h2
            className="font-bold uppercase tracking-widest mb-2"
            style={{
              fontSize: theme.sectionTitleSize,
              color: theme.accentColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            Experience
          </h2>
          <div>
            {resumeData.experience.map((exp, i) => (
              <div key={i}
                style={{ marginBottom: i < resumeData.experience.length - 1 ? 'var(--item-spacing)' : 0 }}
              >
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold">{exp.title}</span>
                    <span className="ml-2" style={{ color: 'var(--secondary-text-color)' }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="ml-2" style={{ color: 'var(--secondary-text-color)' }}>
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-right" style={{ color: 'var(--secondary-text-color)' }}>
                    {`${exp.startDate} - ${exp.endDate}`}
                  </div>
                </div>
                {exp.description && (
                  <ul className="list-disc ml-6 mt-1 text-sm">
                    {exp.description.map((desc, j) => (
                      <li key={j} style={{ marginBottom: 'calc(var(--item-spacing) / 2)' }}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills (Grouped) */}
      <section style={{ marginBottom: 'var(--section-spacing)' }}>
        <h2
          className="font-bold uppercase tracking-widest mb-2"
          style={{
            fontSize: theme.sectionTitleSize,
            color: theme.accentColor,
            fontFamily: theme.headingFontFamily,
          }}
        >
          Skills
        </h2>
        <div className="flex flex-wrap" style={{ gap: 'var(--gap)' }}>
          {resumeData.skills.map((skill, i) => (
            <div key={i} style={{ minWidth: 120 }}>
              <div className="font-semibold text-xs uppercase tracking-wide"
                style={{ color: 'var(--secondary-text-color)' }}>
                {skill.category}
              </div>
              <div className="text-sm">{Array.isArray(skill.skills) ? skill.skills.join(', ') : skill.skills}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications/Additional */}
      {resumeData.hasCerifications && (
        <section style={{ marginBottom: 'var(--section-spacing)' }}>
          <h2
            className="font-bold uppercase tracking-widest mb-2"
            style={{
              fontSize: theme.sectionTitleSize,
              color: theme.accentColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            Certifications
          </h2>
          <ul className="list-disc ml-6 text-sm">
            {resumeData.certifications.map((cert, i) => (
              <li key={i} style={{ marginBottom: i < resumeData.certifications.length - 1 ? 'var(--item-spacing)' : 0 }}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects/Additional Sections */}
      {resumeData.hasProjects && (
        <section>
          <h2
            className="font-bold uppercase tracking-widest mb-2"
            style={{
              fontSize: theme.sectionTitleSize,
              color: theme.accentColor,
              fontFamily: theme.headingFontFamily,
            }}
          >
            Projects
          </h2>
          <ul className="list-disc ml-6 text-sm">
            {resumeData.projects.map((proj, i) => (
              <li key={i} style={{ marginBottom: i < resumeData.projects.length - 1 ? 'var(--item-spacing)' : 0 }}>
                <span className="font-semibold">{proj.name}:</span> {proj.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
});

HarvardResume.displayName = 'HarvardResume';
export default HarvardResume;
