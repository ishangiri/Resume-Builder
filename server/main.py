from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine
from models import Base, User, Resume, Theme
from schemas import ResumePayload
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from schemas import UpdatePayLoad

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[  # Changed from 'origins' to 'allow_origins'
        "https://resume-builder-ishan-giris-projects.vercel.app/",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



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

        resume_obj = Resume(title=data.resume.title, content=data.resume.content, owner=user_obj, template=data.resume.template)
        db.add(resume_obj)

        theme_obj = Theme(name=data.theme.name, settings=data.theme.settings, resume=resume_obj)
        db.add(theme_obj)

        db.commit()
        return {"message": "Resume Saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get('/get-resumes')
def get_resume(user: str, db: Session = Depends(get_db)):
    try:
        userid = db.query(User).filter(User.user_id == user).first()
        if not userid:
            raise HTTPException(status_code=404, detail="No user found")  

        resumes = db.query(Resume).filter(Resume.user_id == user).all()
        result = []
        for resume in resumes:
            theme = db.query(Theme).filter(Theme.resume_id == resume.id).all()
            result.append({
                "resume": resume,
                "theme": theme
            })
        return result

    except HTTPException as http_exc:
        raise http_exc  
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    


@app.get('/get-resumeById')
def get_resume_byID(id : int, db : Session = Depends(get_db)):
    try:
        resume = db.query(Resume).filter(Resume.id == id).first()
        if not resume:
            raise HTTPException(status_code=404, detail="No resume found") 
        theme = db.query(Theme).filter(Theme.resume_id == id).all()
        results = []
        results.append({
            "resume" : resume,
            "theme" : theme
        })
        return results
    except HTTPException as http_exc:
        raise http_exc 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server Error : {str(e)}")
    
    
# @app.put('/update-resumeById')
# def update_resume_byId(id : str, db : Session = Depends(get_db)):

                       

  
@app.delete("/resumes/{resume_id}")
def delete_resume_by_id(resume_id: int, user_id: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.user_id == user_id).first()
        resume = db.query(Resume).filter(Resume.id == resume_id).first()

        if not user or not resume:
            raise HTTPException(status_code=404, detail="User or Resume not found")
        if resume.user_id != user.user_id:
            raise HTTPException(status_code=403, detail="Unauthorized to delete this resume")

        themes = db.query(Theme).filter(Theme.resume_id == resume.id).all()
        for theme in themes:
            db.delete(theme)

        db.delete(resume)
        db.commit()

        return { "detail": "Resume deleted successfully" }

    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

                
 
@app.put("/resumes/{resume_id}")
def update_resume_by_id(
    resume_id: int,
    user_id: str,
    data: UpdatePayLoad,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.user_id == user_id).first()
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not user or not resume:
        raise HTTPException(status_code=404, detail="User or Resume not found")
    if resume.user_id != user.user_id:
        raise HTTPException(status_code=403, detail="Unauthorized to update this resume")

    # Update resume fields
    resume.title = data.resume.title
    resume.content = data.resume.content
    resume.template = data.resume.template

    # Update the associated theme
    theme = db.query(Theme).filter(Theme.resume_id == resume.id).first()
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found for this resume")
    theme.name = data.theme.name
    theme.settings = data.theme.settings

    db.commit()
    db.refresh(resume)
    db.refresh(theme)
    return {
        "resume": resume,
        "theme": theme
        }



        
    
    
    
     