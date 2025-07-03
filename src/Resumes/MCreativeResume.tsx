import React, { type CSSProperties } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useThemeStore } from '../store/themeStores/CreativeResumethemestore';
import { Link, Locate, Mail, Phone } from 'lucide-react';

const HarvardResume = React.forwardRef<HTMLDivElement>((_, ref) => {
  const resumeData = useResumeData();
  const theme = useThemeStore((state) => state.theme);

  const cssVars: CSSProperties & Record<string, string | number> = {
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
    lineHeight: theme.lineHeight,
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    padding: 'var(--padding)',
    width: '210mm',
    height: '297mm',
  };

  return (
    <div ref={ref} className="mx-auto shadow-lg font-sans" style={cssVars}>
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
            <div
              className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs justify-center items-center"
              style={{ color: 'var(--secondary-text-color)' }}
            >
              <span>
                <Locate className="w-4 h-4" style={{ color: theme.accentColor }} />
              </span>
              <span>{resumeData.personalInfo.location}</span>

              <span>
                <Mail className="w-4 h-4" style={{ color: theme.accentColor }} />
              </span>
              <span>{resumeData.personalInfo.email}</span>

              {resumeData.personalInfo.phone && (
                <div className="flex mt-1 flex-wrap gap-x-2 gap-y-1 justify-center items-center">
                  <span>
                    <Phone className="w-4 h-4" style={{ color: theme.accentColor }} />
                  </span>
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}

              {resumeData.personalInfo.linkedin && (
                <div className="flex mt-1 flex-wrap gap-x-2 gap-y-1 items-center justify-center">
                  <span>
                    <Link className="w-4 h-4" style={{ color: theme.accentColor }} />
                  </span>
                  <span>{resumeData.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
          

          <div className="mt-3 md:mt-0 text-right">
            <span
              className="font-medium tracking-wide uppercase"
              style={{
                color: 'var(--accent-color)',
                letterSpacing: '0.08em',
                fontSize: theme.sectionTitleSize,
              }}
            >
              {resumeData.JobTitle}
            </span>
          </div>
        </div>
      </header>

      {/* Education */}
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
    <div className="space-y-[var(--item-spacing)]">
  {resumeData.education.map((edu, i) => (
    <div key={i} className="flex justify-between items-start">
      {/* Left side: Degree + Institution + Details */}
      <div className="flex-1">
        <div className="font-semibold" style={{ fontSize: theme.fontSize }}>
          {edu.degree}
        </div>
        <div
          style={{ color: theme.textColor, fontSize: theme.fontSize }}
        >
          {edu.institution}
        </div>
        {edu.details && (
          <div
            className="mt-1"
            style={{ color: theme.textColor, fontSize: theme.fontSize }}
          >
            {edu.details}
          </div>
        )}
      </div>

      {/* Right side: Period */}
      <div
        className="text-right whitespace-nowrap"
        style={{ color: 'var(--secondary-text-color)', fontSize: theme.fontSize }}
      >
        {edu.period}
      </div>
    </div>
  ))}
</div>

      </section>

      {/* Profile */}
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
        <p style={{ color: theme.textColor, fontSize: theme.fontSize }}>{resumeData.summary}</p>
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
              <div
                key={i}
                style={{ marginBottom: i < resumeData.experience.length - 1 ? 'var(--item-spacing)' : 0 }}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                  <div>
                    <span className="font-semibold" style={{ fontSize: theme.fontSize }}>
                      {exp.title}
                    </span>
                    <span className="ml-2" style={{ color: 'var(--secondary-text-color)', fontSize: theme.fontSize }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="ml-2" style={{ color: 'var(--secondary-text-color)', fontSize: theme.fontSize }}>
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <div
                    className="sm:text-right"
                    style={{ color: 'var(--secondary-text-color)', fontSize: theme.fontSize }}
                  >
                    {`${exp.startDate} - ${exp.endDate}`}
                  </div>
                </div>
                {exp.description && (
                  <ul className="list-disc ml-6 mt-1" style={{ fontSize: theme.fontSize }}>
                    {exp.description.map((desc, j) => (
                      <li
                        key={j}
                        style={{ marginBottom: 'calc(var(--item-spacing) / 2)' }}
                      >
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

      {/* Skills */}
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
            <div key={i} style={{ minWidth: 120, fontSize: theme.fontSize }}>
              <div className="font-semibold uppercase tracking-wide" style={{ color: 'var(--secondary-text-color)', fontSize: theme.fontSize }}>
               {skill.category && skill.category}
              </div>
              <div>{Array.isArray(skill.skills) ? skill.skills.join(', ') : skill.skills}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
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
          <ul className="list-disc ml-6" style={{ fontSize: theme.fontSize }}>
            {resumeData.certifications.map((cert, i) => (
              <li
                key={i}
                style={{ marginBottom: i < resumeData.certifications.length - 1 ? 'var(--item-spacing)' : 0 }}
              >
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
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
          <ul className="list-disc ml-6" style={{ fontSize: theme.fontSize }}>
            {resumeData.projects.map((proj, i) => (
              <li
                key={i}
                style={{ marginBottom: i < resumeData.projects.length - 1 ? 'var(--item-spacing)' : 0 }}
              >
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
