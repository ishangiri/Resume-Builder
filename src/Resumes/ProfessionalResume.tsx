import { forwardRef } from 'react';
import { useResumeData } from '../hooks/useResumeData';


// Resume section title component - reduced spacing
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-base font-bold text-gray-800 uppercase tracking-wider border-b border-blue-500 pb-1 mb-2">
    {children}
  </div>
);

// Experience item component - condensed layout
const ExperienceItem = ({
  title,
  company,
  period,
  location,
  descriptions
}: {
  title: string;
  company: string;
  period: string;
  location: string;
  descriptions: string[];
}) => (
  <div className="mb-3">
    <div className="flex justify-between items-baseline">
      <div className="font-semibold text-gray-800 text-sm">{title}</div>
      <div className="text-xs text-gray-600">{period}</div>
    </div>
    <div className="flex justify-between items-baseline mb-1">
      <div className="font-medium text-gray-700 text-sm">{company}</div>
      <div className="text-xs text-gray-600">{location}</div>
    </div>
    <ul className="list-disc ml-4 space-y-0">
        <li className="text-xs text-gray-700 leading-tight">
        {descriptions}
        </li>
    </ul>
  </div>
);

// Education item component - more compact
const EducationItem = ({
  degree,
  institution,
  period,
  location,
  details
}: {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}) => (
  <div className="mb-2">
    <div className="flex justify-between items-baseline">
      <div className="font-semibold text-gray-800 text-sm">{degree}</div>
      <div className="text-xs text-gray-600">{period}</div>
    </div>
    <div className="flex justify-between items-baseline">
      <div className="font-medium text-gray-700 text-sm">{institution}</div>
      <div className="text-xs text-gray-600">{location}</div>
    </div>
    {details && <div className="text-xs text-gray-700">{details}</div>}
  </div>
);

// Skill item component - more compact
const SkillCategory = ({ 
  category, 
  skills 
}: { 
  category: string; 
  skills: string[] 
}) => (
  <div className="mb-2">
    <div className="font-medium text-gray-700 text-sm">{category}:</div>
    <div className="text-xs text-gray-700 leading-tight">
      {skills.join(', ')}
    </div>
  </div>
);

// Main resume template
const ProfessionalTemplate = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {

    const resumeData = useResumeData();

    return (
      <div
        {...props}
        ref={ref}
      className="p-8 flex-1 w-full h-full mx-auto bg-white text-gray-800 text-sm font-sans"
      style={{ width: "210mm", height: "297mm" }}
      >
        {/* Header Section */}
        <div className="flex flex-col gap-2 mb-1">
          <div className="text-2xl font-bold text-gray-900 text-center">
            {resumeData.personalInfo.name}
          </div>
            <div className="text-lg font-mono text-gray-900 text-center">
            {resumeData.JobTitle}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 text-xs text-gray-600">
            <span>{resumeData.personalInfo.email}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.linkedin}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </div>
        
        <hr className="border-t border-gray-300 w-full" />
        
        {/* Summary Section */}
        <div>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-xs text-gray-700 mb-2 leading-tight">
            {resumeData.summary}
          </p>
        </div>
        
        {/* Experience Section */}
        <div>
          {resumeData.hasExperience  && <SectionTitle>Experience</SectionTitle>}
          {resumeData.experience.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              company={exp.company}
              period= {exp.period}
              location={exp.location}
              descriptions={exp.descriptions}
            />
          ))}
        </div>
        
        {/* Education Section */}
        <div>
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((edu, index) => (
            <EducationItem
              key={index}
              degree={edu.degree}
              institution={edu.institution}
              period={edu.period}
              location={edu.location}
              details={edu.details}
            />
          ))}
        </div>
        
        {/* Skills Section */}
        <div>
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-2 gap-x-4">
            {resumeData.skills.map((skill, index) => (
              <SkillCategory
                key={index}
                category={skill.category}
                skills={skill.skills}
              />
            ))}
          </div>
        </div>
        
        {/* Certifications Section */}
        <div>
          {resumeData.hasCerifications && <SectionTitle>Certifications</SectionTitle> } 
          <ul className="list-disc ml-4 space-y-0 mb-2">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} className="text-xs text-gray-700">
                {cert}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Projects Section */}
        <div>
           {resumeData.hasProjects && <SectionTitle>Projects</SectionTitle> } 
          <div className="space-y-1">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="text-xs">
                <span className="font-medium text-gray-800">{project.name}: </span>
                <span className="text-gray-700">{project.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ProfessionalTemplate.displayName = 'ProfessionalTemplate';
export default ProfessionalTemplate;