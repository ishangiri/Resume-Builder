import React from 'react';
import { useResumeData } from '../hooks/useResumeData';

const ResumeTemplate =  React.forwardRef<HTMLDivElement>((_, ref) => {
 
  const resumeData = useResumeData();

 return( <div ref={ref} className="flex w-full h-full bg-gray-100 font-sans text-xs" style={{ width: '210mm', height: '297mm' }}>
      {/* Left Sidebar */}
      <div className="w-2/5 bg-green-700 text-white p-4 space-y-4">
        <div className="text-2xl font-bold tracking-wider">
          {resumeData.personalInfo.name}
        </div>
        
        <section>
         {resumeData.hasProjects &&  <h3 className="text-sm font-bold mb-2 tracking-wide">Projects</h3>}
          <div className="space-y-3">
            {resumeData.projects.map((achievement, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-1 text-green-100 text-xs">{achievement.name}</h4>
                <p className="text-xs leading-tight text-green-50">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold mb-2 tracking-wide">SKILLS</h3>
          <div className="space-y-1">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="text-xs text-green-100 font-semibold">{skill.category}
              <div  className="text-xs text-green-50">{skill.skills}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
        {  resumeData.hasCerifications && <h3 className="text-sm font-bold mb-2 tracking-wide">CERTIFICATION</h3>}
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-green-100 text-xs">{...resumeData.certifications}</h4>
            </div>
    
          </div>
        </section>
      </div>

      {/* Right Main Content */}
      <div className="w-3/5 bg-white p-4 text-gray-800 space-y-4">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="text-lg font-bold text-blue-600 mb-1">{resumeData.JobTitle}</h1>
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span>📧 Email</span>
            <span>🔗 {resumeData.personalInfo.email}</span>
            <span>📍 {resumeData.personalInfo.location}</span>
             <span>🌐 {resumeData.personalInfo.linkedin}</span>
          </div>
        </div>

        <section>
          <h2 className="text-sm font-bold mb-2 text-gray-800">SUMMARY</h2>
          <p className="text-xs text-gray-700 leading-tight">{resumeData.summary}</p>
        </section>

        <section>
         {resumeData.hasExperience ? <h2 className="text-sm font-bold mb-3 text-gray-800">EXPERIENCE</h2> : "" } 
          <div className="space-y-4">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{job.title}</h3>
                    {job.company && (
                      <p className="text-blue-600 font-medium text-xs">{job.company}</p>
                    )}
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <p>{job.period}</p>
                    {job.location && <p>{job.location}</p>}
                  </div>
                </div>
                {job.description && (
                  <ul className="space-y-1 ml-3">
                    {job.description.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-0.5 text-xs">•</span>
                        <span className="text-gray-700 text-xs leading-tight">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        <section>
           <h2 className="text-sm font-bold mb-3 text-gray-800">EDUCATION</h2>
            {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                {edu.institution && (
                  <p className="text-blue-600 font-medium text-xs">{edu.institution}</p>
                )}
              </div>
              <div className="text-right text-xs text-gray-600">
                <p>{edu.period}</p>
                {edu.location && <p>{edu.location}</p>}
              </div>
            </div>
            {edu.details && (
              <p className="text-xs text-gray-700 leading-tight">{edu.details}</p>
            )}
          </div>
            ))}
          </section>
      </div>
    </div>
  );
});

export default ResumeTemplate;