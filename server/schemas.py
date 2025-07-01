from pydantic import BaseModel
from typing import  Dict
from typing import List


class ResumeSchema(BaseModel):
    title: str
    content: Dict  # use Dict for JSON blobs
    template: str

class UserSchema(BaseModel):
    user_id : str
    email : str

class ThemeSchema(BaseModel):
    name: str
    settings: Dict

class ResumePayload(BaseModel):
    user : UserSchema
    resume : ResumeSchema
    theme : ThemeSchema

class UpdatePayLoad(BaseModel):
    resume : ResumeSchema
    theme : ThemeSchema



class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str
    linkedin: str
    location: str

class SkillCategory(BaseModel):
    category: str
    skills: List[str]

class EducationItem(BaseModel):
    degree: str
    institution: str
    period: str
    location: str
    details: str

class ProjectItem(BaseModel):
    name: str
    description: str

class ExperienceItem(BaseModel):
    jobTitle: str
    company: str
    period: str
    location: str
    description: List[str]

class ResumeSummary(BaseModel):
    personalInfo: PersonalInfo
    JobTitle: str
    experience: List[ExperienceItem] | None = None 
    education: List[EducationItem] | None = None
    skills: List[SkillCategory]
    projects: List[ProjectItem] | None = None

class SkillSuggestionRequest(BaseModel):
    JobTitle: str
    category: str
