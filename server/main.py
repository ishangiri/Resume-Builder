from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine
from models import Base, User, Resume, Theme
from schemas import ResumePayload
from schemas import ResumeSummary
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from schemas import UpdatePayLoad, SkillSuggestionRequest
import openai
from dotenv import load_dotenv
import os
from fastapi.responses import FileResponse
from jinja2 import Environment, FileSystemLoader
from fastapi import Request
import subprocess, tempfile
from fastapi.responses import Response

load_dotenv()
openai.api_key = os.getenv("API_KEY")

client = openai.OpenAI(api_key=openai.api_key)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[  # Changed from 'origins' to 'allow_origins'
        "https://resume-builder-ishan-giris-projects.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind = engine)


@app.get('/')
def read_root():
    return {"message" : "App is running"}

@app.post('/save-resume')
def save_resume_api(data: ResumePayload, db: Session = Depends(get_db)):
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


@app.post("/generate-resume-summary")
def generate_resume_summary(data: ResumeSummary):
    try:
        name = data.personalInfo.name
        job_title = data.JobTitle
        education = data.education
        skills = data.skills
        experience = data.experience
        
        if not name or not job_title or not skills or not experience or not education:
            raise HTTPException(status_code=400, detail='Missing one of the required fields: name, job_title, skills, experience, or education')

        # Flatten skills into string
        flat_skills = [", ".join(s.skills) for s in skills]
        all_skills = "; ".join(flat_skills)
        
        # Flatten education
        edu_summary = "; ".join(
            [f"{e.degree} at {e.institution} ({e.period})" for e in education]
        )
        
        # Build experience context
        experience_context = ""
        if experience:
            experience_context = "Work Experience: " + "; ".join(
            [f"{e.jobTitle} at {e.company} ({e.period})" for e in experience]
        ) + "."

        else:
            experience_context = "Fresh graduate with strong academic foundation. "
        
        # Enhanced prompt with better structure and specificity
        prompt = f"""Create a professional resume summary for {name} applying for {job_title} positions.

CANDIDATE PROFILE:
- Target Role: {job_title}
- Skills: {all_skills}
- Education: {edu_summary}
- {experience_context}

REQUIREMENTS:
1. Just Write 2-3 sentences (60-80 words)
2. Start with years of experience OR "Recent graduate" if no experience
4. Highlight ONE specific key achievement or strength from experience otherwise dont include anything if no experience
5. End with value proposition for employers
6. Use action verbs and quantifiable terms where possible
7. Optimize for ATS with industry keywords
8. Avoid buzzwords like "passionate," "hardworking," "team player"
9. Avoid personal pronouns like "I" or "my"
10.Avoid organization names and specific project names
11.No need to include everything about education or skills in the summary

TONE: Professional, confident, results-focused
FORMAT: Single paragraph, no bullet points"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert resume writer specializing in ATS-optimized summaries. 
                    Generate professional summaries that:
                    - writes summaries that will pass ATS
                    - Use industry-standard terminology
                    - Focus on measurable impact over generic descriptions  
                    - Include relevant keywords naturally
                    - Sound professional but not robotic
                    - Avoid clichéd phrases and overused adjectives"""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=150,  # Reduced for more concise output
            temperature=0.6,  # Lower temperature for more consistent, professional output
        )
        
        return {"summary": response.choices[0].message.content.strip()}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")
     

#skills generation with category or generate skills based with categories     
@app.post('/generate-skills')
def generate_skills(data : SkillSuggestionRequest):
    category = data.category
    JobTitle = data.JobTitle

    if not JobTitle:
        raise HTTPException(status_code=400, detail="JobTitle is required")
    
        
    try:
        prompt = f"""Generate a list of 10-20 technical skills for a {JobTitle} position in this category {category}.
        Focus on the most relevant and in-demand skills in the industry.
        Provide the skills as a comma-separated list without any additional text."""
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert in generating industry-specific skill sets for job roles based on category and job title."""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=100,
            temperature=0.7,
        )
        
        skills = response.choices[0].message.content.strip()
        return {"skills": skills.split(",")}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating skills: {str(e)}")



# Template loader
templates = Environment(loader=FileSystemLoader("templates"))

@app.options("/generate-pdf/")
async def preflight_generate_pdf():
    return Response(status_code=204)

@app.post("/generate-pdf/")
async def generate_pdf(request: Request):
    body = await request.json()
    html_content = body.get("html", "")
    title = body.get("title", "Resume")

    # 1. Render the full HTML with Tailwind + content
    rendered_html = templates.get_template("resume.html").render({
        "title": title,
        "content": html_content
    })

    # 2. Write to temp .html file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".html") as f:
        f.write(rendered_html.encode("utf-8"))
        html_path = f.name

    # 3. Define temp .pdf path
    pdf_path = html_path.replace(".html", ".pdf")

    # 4. Call Puppeteer to render HTML -> PDF
    subprocess.run(
        ["node", "puppeteerRender.js", html_path, pdf_path],
        check=True,
        cwd=os.path.dirname(__file__)
    )

    # 5. Return PDF as response
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"{title}.pdf"
    )
