from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine
from models import Base, User, Resume, Theme
from schemas import ResumePayload
from database import get_db



app = FastAPI()

Base.metadata.create_all(bind = engine)


@app.get('/')
def read_root():
    return {"message" : "App is running"}

@app.post('/save-resume')
def test_save_resume_api(data: ResumePayload, db: Session = Depends(get_db)):
    try:
        user_obj = db.get(User, data.user.user_id)
        if not user_obj:
            user_obj = User(user_id=data.user.user_id, email=data.user.email)
            db.add(user_obj)

        resume_obj = Resume(title=data.resume.title, content=data.resume.content, owner=user_obj)
        db.add(resume_obj)

        theme_obj = Theme(name=data.theme.name, settings=data.theme.settings, resume=resume_obj)
        db.add(theme_obj)

        db.commit()
        return {"message": "Resume Saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))



  

 



        
    
    
    
     