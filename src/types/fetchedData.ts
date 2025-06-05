import type { GenericTheme } from "./GenericTheme"


type Experience = {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string[]
  location: string
}



export type fetchedData = {
     personalInfo: {
        name: string | "",
        email: string | "",
        phone: string | ""
        link: string | ""
        address: string | ""
      },
  hasExperience: boolean
  hasCerifications : boolean
  hasProjects : boolean
  jobTitle : string | null
  summary: string | null
  skills: {
    category: string
    skills: string[] 
  }[] | null
  experience: Experience[] | null,
  education: {
    degree: string
    institution: string
    period: string
    location: string
    details?: string
  }[] | null,
  projects: {
    name: string
    description: string
  }[] | null,
  certifications: string[] | null,
 
}


interface ResumeContent {
  JobTitle?: string,
  summary?: string,
}


export type fetchedResumes = {
    
  resume: {
    title: string,
    content: ResumeContent,
    id: string,
    template : string
  },
  theme: [
    {
     name: string,
    settings: object
    }
  ],
}


export type ResumeData = {
    
        resume : {
          title : string,
          content : object,
          template : string,
        } ,
        theme : [{
               name : string | undefined,
              settings : GenericTheme | undefined
            }]
          }