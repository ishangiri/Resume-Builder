   import { useResumeStore } from "../store/ResumeStore";
   

   
   export const useResumeData = () => {
  

    const firstName = useResumeStore((state) => state.firstName);     
    const lastName = useResumeStore((state) => state.lastName);
    const email = useResumeStore((state) => state.email);
    const phone = useResumeStore((state) => state.phone);
    const address = useResumeStore((state) => state.address);
    const link = useResumeStore((state) => state.link)
    const experience = useResumeStore((state) => state.experience);
    const summary = useResumeStore((state) => state.summary)
    const education = useResumeStore((state) => state.education);
    const skills = useResumeStore((state) => state.skills);
    const certifications = useResumeStore((state) => state.certifications);
    const projects = useResumeStore((state) => state.projects);
    const hasExperience = useResumeStore((state) => state.hasExperience);
    const hasCerifications = useResumeStore((state) => state.hasCerifications);
    const hasProjects = useResumeStore((state) => state.hasProjects)
    const JobTitle  = useResumeStore((state) => state.jobTitle)
  



      return {
        personalInfo: {
        name: `${firstName || 'John'} ${lastName || 'Doe'}`,
        email: email || 'abc@gmail.com',
        phone: phone || '+1 (123) 456-7890',
        linkedin: link || "linkedin.com",
        location: address || 'New York, NY'
      },
      JobTitle : JobTitle || "Software Developer",
      summary:
        summary ||
        'Experienced software developer with 5+ years of expertise in building scalable web applications. Strong focus on front-end development with React and TypeScript. Passionate about creating elegant, user-friendly interfaces and maintaining high code quality.',
  experience: hasExperience
  ? (
      experience.length > 0
        ? experience.map((exp) => ({
            title: exp.title || 'Frontend Developer',
            company: exp.company || 'Tech Company',
            period: `${exp.startDate || 'Jan 2020'} - ${exp.endDate || 'Present'}`,
            location: exp.location || 'Remote',
            descriptions: exp.description?.length
              ? exp.description
              : ['Worked on multiple client projects using React and Node.js']
          }))
        : [
            {
              title: 'Senior Frontend Developer',
              company: 'Tech Solutions Inc.',
              period: 'Jan 2021 - Present',
              location: 'New York, NY',
              descriptions: [
                'Lead development of a React-based dashboard used by 50,000+ monthly active users',
                'Implemented responsive design principles, improving mobile user engagement by 35%',
                'Architected state management solution using Redux, reducing UI bugs by 40%',
                'Mentored junior developers and conducted code reviews to ensure best practices'
              ]
            },
             {
              title: 'Senior Frontend Developer',
              company: 'Tech Solutions Inc.',
              period: 'Jan 2021 - Present',
              location: 'New York, NY',
              descriptions: [
                'Lead development of a React-based dashboard used by 50,000+ monthly active users',
                'Implemented responsive design principles, improving mobile user engagement by 35%',
                'Architected state management solution using Redux, reducing UI bugs by 40%',
                'Mentored junior developers and conducted code reviews to ensure best practices'
              ]
            },
                   {
              title: 'Senior Frontend Developer',
              company: 'Tech Solutions Inc.',
              period: 'Jan 2021 - Present',
              location: 'New York, NY',
              descriptions: [
                'Lead development of a React-based dashboard used by 50,000+ monthly active users',
                'Implemented responsive design principles, improving mobile user engagement by 35%',
                'Architected state management solution using Redux, reducing UI bugs by 40%',
                'Mentored junior developers and conducted code reviews to ensure best practices'
              ]
            }
          ]
    )
  : [],

      education:
        education.length > 0
          ? education
          : [
              {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'University of Technology',
                period: '2012 - 2016',
                location: 'Boston, MA',
                details: "GPA: 3.8/4.0, Dean's List, Computer Science Honor Society"
              }
            ],
      skills:
        skills.length > 0
          ? skills
          : [
              {
                category: 'Programming Languages',
                skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Python']
              },
              {
                category: 'Frameworks & Libraries',
                skills: ['React', 'Redux', 'Next.js', 'TailwindCSS', 'Material UI', 'Jest']
              },
              {
                category: 'Tools & Platforms',
                skills: ['Git', 'Webpack', 'npm', 'AWS', 'Docker', 'CI/CD', 'Jira']
              },
              {
                category: 'Methodologies',
                skills: ['Agile/Scrum', 'TDD', 'Responsive Design', 'Accessibility (WCAG)']
              }
            ],
      certifications: hasCerifications ?
        certifications.length > 0
          ? certifications
          : ['AWS Certified Developer – Associate', 'Google Professional Web Developer'] : [],
      projects: hasProjects ?
        projects.length > 0
          ? projects
          : [
              {
                name: 'E-commerce Platform',
                description: 'Built a full-featured online store with React, Node.js, and MongoDB'
              },
              {
                name: 'Task Management App',
                description: 'Developed a Kanban-style productivity tool with drag-and-drop functionality'
              }
            ] : [],
            hasExperience: hasExperience,
            hasProjects : hasProjects,
            hasCerifications : hasCerifications

    };

}