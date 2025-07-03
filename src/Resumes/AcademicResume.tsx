import { forwardRef } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { Link } from 'lucide-react';
import { useThemeStore } from '../store/themeStores/AcademicThemeStore';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AcademicResume = forwardRef<HTMLDivElement>((_, ref) => {
   const resumeData = useResumeData();
   const {theme} = useThemeStore();

  const themeStyles = {
    '--background-color': theme.backgroundColor,
    '--text-color': theme.textColor,
    '--secondary-text-color': theme.secondaryTextColor,
    '--accent-color': theme.accentColor,
    '--divider-color': theme.dividerColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    color: 'var(--text-color)',
    backgroundColor: 'var(--background-color)',
    padding: theme.padding
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className="w-[210mm] h-[297mm] shadow-lg overflow-hidden"
      style={themeStyles}
    >
      <div style={{ padding: theme.padding }}>
        <header style={{ marginBottom: theme.sectionSpacing }}>
          <p
            className="font-semibold uppercase tracking-wider text-[var(--accent-color)]"
            style={{ fontSize: theme.subHeadingSize }}
          >
            {resumeData.JobTitle}
          </p>
          <h1
            className="font-bold text-[var(--text-color)]"
            style={{ fontSize: theme.headingSize }}
          >
            {resumeData.personalInfo.name}
          </h1>
          <div className="mt-1 border-b-[10px] border-[var(--accent-color)]" />
        </header>

        <div className="flex" style={{ gap: theme.gap }}>
          <main className="w-2/3">
            <section style={{ marginBottom: theme.sectionSpacing }}>
              <h2
                className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                style={{ fontSize: theme.sectionTitleSize }}
              >
                Professional summary
              </h2>
              <p className="mt-3 leading-relaxed" style={{ fontSize: theme.fontSize }}>
                {resumeData.summary}
              </p>
            </section>

            {resumeData.hasExperience && (
              <section style={{ marginBottom: theme.sectionSpacing }}>
                <h2
                  className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                  style={{ fontSize: theme.sectionTitleSize }}
                >
                  Experience
                </h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} style={{ marginTop: index === 0 ? '1.25rem' : theme.itemSpacing }}>
                    <h3 className="font-bold" style={{ fontSize: theme.subHeadingSize }}>{exp.title}</h3>
                    <p className="text-[var(--secondary-text-color)]" style={{ fontSize: theme.fontSize }}>
                      {`${exp.startDate} - ${exp.endDate}`}
                    </p>
                    <p className="font-semibold" style={{ fontSize: theme.fontSize }}>
                      {exp.company} / {exp.location}
                    </p>
                    <ul className="mt-2 list-disc list-inside space-y-1 pl-2" style={{ fontSize: theme.listItemSize }}>
                      {exp.description?.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {resumeData.hasProjects && (
              <section style={{ marginBottom: theme.sectionSpacing }}>
                <h2
                  className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                  style={{ fontSize: theme.sectionTitleSize }}
                >
                  Projects
                </h2>
                <ul className="mt-3 space-y-2 list-disc list-inside" style={{ fontSize: theme.listItemSize }}>
                  {resumeData.projects.map((project, index) => (
                    <li key={index} style={{ marginBottom: theme.itemSpacing }}>
                      <span className="font-bold">{project.name}:</span> {project.description}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>

          <aside className="w-1/3">
            <section className="mb-6 space-y-2" style={{ fontSize: theme.fontSize, marginBottom: theme.sectionSpacing }}>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-color)]"><PhoneIcon /></span>
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-color)]"><EmailIcon /></span>
                <span>{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-color)]"><LocationIcon /></span>
                <span>{resumeData.personalInfo.location}</span>
              </div>
                 {resumeData.personalInfo.linkedin && <div className="flex items-center gap-3">
                <span className="text-[var(--accent-color)]"><Link className='h-4 w-4' /></span>
                <span>{resumeData.personalInfo.linkedin}</span>
              </div> }
            </section>
            <hr className="border-[var(--divider-color)] my-4" />

            <section style={{ marginBottom: theme.sectionSpacing }}>
              <h2
                className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                style={{ fontSize: theme.sectionTitleSize }}
              >
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} style={{ marginTop: index === 0 ? '1rem' : theme.itemSpacing }}>
                  <h3 className="font-bold" style={{ fontSize: theme.subHeadingSize }}>{edu.degree}</h3>
                  <p style={{ fontSize: theme.fontSize }}>{edu.institution}</p>
                  <p className="text-[var(--secondary-text-color)]" style={{ fontSize: theme.fontSize }}>{edu.period}</p>
                </div>
              ))}
            </section>

            {resumeData.hasCerifications && (
              <section style={{ marginBottom: theme.sectionSpacing }}>
                <h2
                  className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                  style={{ fontSize: theme.sectionTitleSize }}
                >
                  Certifications
                </h2>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} style={{ marginTop: index === 0 ? '1rem' : theme.itemSpacing }}>
                    <p className="font-bold" style={{ fontSize: theme.fontSize }}>{cert}</p>
                  </div>
                ))}
              </section>
            )}

            <section>
              <h2
                className="inline-block bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider py-1.5 px-3 rounded"
                style={{ fontSize: theme.sectionTitleSize }}
              >
                Skills
              </h2>
              {resumeData.skills.map((skill, index) => (
                <div key={index} style={{ marginTop: index === 0 ? '1rem' : theme.itemSpacing }}>
                  {skill.category && <h4 className="font-bold" style={{ fontSize: theme.fontSize }}>{skill.category}</h4> }
                  <p className="text-[var(--primary-text-color)] leading-relaxed" style={{ fontSize: theme.fontSize }}>
                    {skill.skills.join(', ')}
                  </p>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
});

AcademicResume.displayName = 'AcademicResume';

export default AcademicResume;
