import type { GenericTheme } from "./GenericTheme"


type Experience = {
  title: string
  company: string
  startDate : string
  endDate : string
  description: string[]
  location: string
}



export type fetchedData = {
     personalInfo: {
        name: string | "",
        email: string | "",
        phone: string | ""
        linkedin: string | ""
        location: string | ""
      } | null,
  hasExperience: boolean | null
  hasCerifications : boolean | null
  hasProjects : boolean | null
  JobTitle : string | null
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

export type serverData = {
     personalInfo: {
        name: string
        email: string
        phone: string
        linkedin: string
        location: string
      },
  hasExperience: boolean
  hasCerifications : boolean
  hasProjects : boolean
  JobTitle : string
  summary: string
  skills: {
    category: string
    skills: string[] 
  }[]
  experience: Experience[],
  education: {
    degree: string
    institution: string
    period: string
    location: string
    details?: string
  }[],
  projects: {
    name: string
    description: string
  }[],
  certifications: string[],
}


interface ResumeContent {
  JobTitle?: string,
  summary?: string,
}


export type fetchedResumes = {
    
  resume: {
    title: string,
    content: ResumeContent,
    id: number,
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
          id : number
        } ,
        theme : [{
               name : string | undefined,
              settings : GenericTheme | undefined
            }]
          }