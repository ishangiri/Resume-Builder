import { forwardRef } from 'react';
import { useResumeData } from '../hooks/useResumeData';

// Section Title - bold left line style
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-sm font-semibold text-blue-800 border-l-4 border-blue-500 pl-2 mb-2">
    {children}
  </h2>
);

const ExperienceItem = ({
  title,
  company,
  period,
  location,
  descriptions,
}: {
  title: string;
  company: string;
  period: string;
  location: string;
  descriptions: string[];
}) => (
  <div className="mb-4">
    <div className="flex justify-between">
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{period}</div>
    </div>
    <div className="flex justify-between mb-1">
      <div className="text-sm text-gray-700">{company}</div>
      <div className="text-sm text-gray-500">{location}</div>
    </div>
    <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
      {descriptions.map((desc, index) => (
        <li key={index}>{desc}</li>
      ))}
    </ul>
  </div>
);

const EducationItem = ({
  degree,
  institution,
  period,
  location,
  details,
}: {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}) => (
  <div className="mb-3">
    <div className="flex justify-between">
      <div className="font-medium text-gray-900">{degree}</div>
      <div className="text-sm text-gray-500">{period}</div>
    </div>
    <div className="flex justify-between">
      <div className="text-sm text-gray-700">{institution}</div>
      <div className="text-sm text-gray-500">{location}</div>
    </div>
    {details && <p className="text-sm text-gray-600 mt-1">{details}</p>}
  </div>
);

const SkillCategory = ({
  skills,
}: {
  skills: string[];
}) => (
  <div className="mb-3">
    <div className="text-sm text-gray-700 font-semibold">{skills.join(', ')}</div>
  </div>
);

const ModernTemplate = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {

    const resumeData = useResumeData();
   

    return (
      <div
        {...props}
        ref={ref}
   className="p-8 flex-1 w-full h-full mx-auto bg-white text-gray-800 text-sm font-sans"
      style={{ width: "210mm", height: "297mm" }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
            <div className="text-md">
            {resumeData.JobTitle}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-4">
            <span>{resumeData.personalInfo.email}</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>{resumeData.personalInfo.linkedin}</span>
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </div>


           {/* Summary */}
        <div className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-sm text-gray-800">{resumeData.summary}</p>
        </div>

       
        {/* Projects */}
        <div className="mb-4">
          {resumeData.hasProjects && <SectionTitle>Projects</SectionTitle>}
          {resumeData.projects.map((proj, i) => (
            <div key={i} className="mb-1">
              <span className="font-semibold">{proj.name}:</span>{' '}
              <span className="text-sm">{proj.description}</span>
            </div>
          ))}
        </div>

          {/* Skills */}
        <div>
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-2 gap-x-8">
            {resumeData.skills.map((skill, i) => (
              <SkillCategory key={i} {...skill} />
            ))}
          </div>
        </div>
     


        {/* Show when user has Experience */}
        <div className="mb-4">
        {resumeData.hasExperience && <SectionTitle>EXPERIENCE</SectionTitle> } 
          {resumeData.experience.map((exp, i) => (
            <ExperienceItem key={i} {...exp} />
          ))}
        </div>

        {/* Education */}
        <div className="mb-4">
          <SectionTitle>Education</SectionTitle>
          {resumeData.education.map((edu, index) => (
            <EducationItem key={index} {...edu} />
          ))}
        </div>

             {/* Show when user has Certifications */}
        <div className="mb-4">
         {resumeData.hasCerifications && <SectionTitle>CERTFICATIONS</SectionTitle>}
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {resumeData.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

 </div>
      
    );
  }
);

ModernTemplate.displayName = 'ResumeTemplate2';
export default ModernTemplate;
