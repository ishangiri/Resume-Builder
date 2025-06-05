from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship, declarative_base
from database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, index=True)
    user_id = Column(String, primary_key=True) #firebase uuid 
    email = Column(String(100), unique=True, nullable=False)

    # Relationships of the user with other models
    resumes = relationship('Resume', back_populates='owner')

class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    title = Column(String(100), nullable=False)
    template = Column(String, nullable=False)
    content = Column(JSON, nullable=False)
    user_id = Column(String, ForeignKey('users.user_id'), nullable=False)

    owner = relationship('User', back_populates='resumes')
    themes = relationship('Theme', back_populates='resume', cascade='all, delete-orphan')


class Theme(Base):
    __tablename__ = 'themes'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    settings = Column(JSON, nullable=False)

    resume_id = Column(Integer, ForeignKey('resumes.id'), nullable=False)
    resume = relationship('Resume', back_populates='themes')



