from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship, declarative_base

#Base Class all models will inherit from
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(String, primary_key=True) #firebase uuid 
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    # Relationships of the user with other models
    resumes = relationship('Resume', back_populates='owner')

class Resume(Base):
    __tablename__ = 'resumes'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(JSON, nullable=False) #store resume content as JSON
    #foreign key to link the tables
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    #relationship to the user who owns the resume
    owner = relationship('User', back_populates='resumes')

