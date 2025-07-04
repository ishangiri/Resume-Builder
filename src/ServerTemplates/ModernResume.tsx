import React, { forwardRef } from 'react';
import { Phone, Link, Locate, Mail } from 'lucide-react';
import type { serverData } from '../types/fetchedData';
import type { GenericTheme } from '../types/GenericTheme';

interface Props extends React.HTMLProps<HTMLDivElement> {
  resumeData: serverData;
  theme: GenericTheme;
}

const ModernTemplate = forwardRef<HTMLDivElement, Props>(
  ({resumeData, theme, ...props}, ref) => {


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
             boxSizing: 'border-box'
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
             <div className="text-sm mt-1 flex flex-wrap gap-x-2 gap-y-1" style={{ color: theme.subtleTextColor }}>
               <span><Mail className='w-4 h-4' /></span>
               <span>{resumeData.personalInfo.email}</span>
               <span><Phone className='w-4 h-4' /></span>
               <span>{resumeData.personalInfo.phone}</span>
               {resumeData.personalInfo.linkedin && <div className='flex justify-center gap-x-2 gap-y-1 text-sm'> <span><Link className='w-4 h-4' /></span>
               <span>{resumeData.personalInfo.linkedin}</span> </div> }
               <span><Locate className='w-4 h-4' /></span>
               <span>{resumeData.personalInfo.location}</span>
             </div>
           </div>
   
           {/* Summary */}
           {resumeData.summary && (
             <div className="mb-4">
               <h2 
                 className="font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                   fontSize : theme.sectionHeadingSize
                 }}
               >
                 Summary
               </h2>
               <p style={{fontSize : theme.fontSize}}>{resumeData.summary}</p>
             </div>
           )}
   
           {/* Projects */}
           {resumeData.hasProjects && resumeData.projects && resumeData.projects.length > 0 && (
             <div className="mb-4">
               <h2 
                 className=" font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                   fontSize : theme.sectionHeadingSize
                 }}
               >
                 Projects
               </h2>
               {resumeData.projects.map((proj, i) => (
                 <div style={{fontSize : theme.fontSize}} key={i} className="mb-2">
                   <span className="font-semibold" style={{ color: theme.textColor }}>{proj.name}:</span>{' '}
                   <span style={{ color: theme.mediumTextColor, }}>{proj.description}</span>
                 </div>
               ))}
             </div>
           )}
   
           {/* Skills */}
           {resumeData.skills && resumeData.skills.length > 0 && (
             <div className='mb-2'>
               <h2 
                 className="font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                 }}
               >
                 Skills
               </h2>
               <div className="grid grid-cols-2 gap-x-6">
                 {resumeData.skills.map((skillItem, i) => (
                   <div style={{color: theme.textColor, fontSize : theme.fontSize}} key={i} className="mb-2 font-semibold">
                    {skillItem.category && skillItem.category + ": " }  
                     <div className="font-medium mt-1" style={{ color: theme.mediumTextColor, fontSize : theme.fontSize }}>
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
                 className="font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                   fontSize : theme.sectionHeadingSize
                 }}
               >
                 Experience
               </h2>
               {resumeData.experience.map((exp, i) => (
                 <div key={i} className="mb-4">
                   <div className="flex justify-between items-baseline">
                     <div className="font-semibold" style={{ color: theme.textColor, fontSize : theme.fontSize }}>{exp.title}</div>
                     <div className="text-xs" style={{ color: theme.subtleTextColor }}> {`${exp.startDate} - ${exp.endDate}`}</div>
                   </div>
                   <div className="flex justify-between items-baseline mb-1">
                     <div className="text-xs" style={{ color: theme.mediumTextColor }}>{exp.company}</div>
                     <div className="text-xs" style={{ color: theme.subtleTextColor }}>{exp.location}</div>
                   </div>
                   <ul className="list-disc ml-5 space-y-1" style={{ color: theme.mediumTextColor, fontSize : theme.fontSize }}>
                     {exp.description?.map((desc, index) => (
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
                 className="font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                   fontSize : theme.sectionHeadingSize
                 }}
               >
                 Education
               </h2>
               {resumeData.education.map((edu, index) => (
                 <div key={index} className="mb-3">
                   <div className="flex justify-between items-baseline">
                     <div className="font-medium" style={{ color: theme.textColor }}>{edu.degree}</div>
                     <div className="text-xs" style={{ color: theme.subtleTextColor }}>{edu.period}</div>
                   </div>
                   <div className="flex justify-between items-baseline mb-0.5">
                     <div className="text-sm" style={{ color: theme.mediumTextColor }}>{edu.institution}</div>
                     <div className="text-xs" style={{ color: theme.subtleTextColor }}>{edu.location}</div>
                   </div>
                   {edu.details && <p className=" mt-1" style={{ color: theme.mediumTextColor, fontSize : theme.fontSize }}>{edu.details}</p>}
                 </div>
               ))}
             </div>
           )}
   
           {/* Certifications */}
           {resumeData.hasCerifications && resumeData.certifications && resumeData.certifications.length > 0 && (
             <div className="mb-4">
               <h2 
                 className= "font-semibold pl-2 mb-3 border-l-4" 
                 style={{
                   color: theme.sectionTitleTextColor,
                   borderLeftColor: theme.accentColor,
                   fontSize : theme.sectionHeadingSize
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