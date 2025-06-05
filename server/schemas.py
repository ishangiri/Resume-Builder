from pydantic import BaseModel
from typing import  Dict, Any


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
