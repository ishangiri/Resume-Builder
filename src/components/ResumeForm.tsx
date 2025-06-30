import * as  React from 'react';
import { useState, useEffect } from 'react';
import {
  User, FileText, Code, Briefcase, GraduationCap,
  Award, Trophy, ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import {
  PersonalDetails, EducationSection, SkillSection, SummarySection,
  ExperienceSection, JobTitleSection, CertificationSection, ProjectSection
} from './FormSections';

interface props{
  saveResume: () => void;
  completeResume: () => void;
}

const ResumeForm = ({saveResume, completeResume} : props) => {
const [currentStep, setCurrentStep] = useState(0);

const [mobileView, setMobileView] = useState(false);


  const steps = [
    { id: 'personal-details', title: 'Personal Details', icon: User, component: PersonalDetails },
    { id: 'job-title', title: 'Job Title', icon: Briefcase, component: JobTitleSection },
    { id: 'skills', title: 'Skills', icon: Code, component: SkillSection },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, component: ExperienceSection },
    { id: 'education', title: 'Education', icon: GraduationCap, component: EducationSection },
    { id: 'projects', title: 'Projects', icon: Award, component: ProjectSection },
    { id: 'certifications', title: 'Certifications', icon: Trophy, component: CertificationSection },
    { id: 'summary', title: 'Professional Summary', icon: FileText, component: SummarySection },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const CurrentStepComponent = steps[currentStep].component;
  const currentStepData = steps[currentStep];

useEffect(() => {
 if(window.innerWidth < 1024){
    setMobileView(true);
 }
}, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center sm:mb-6 mb-4">
          <h1 className="sm:text-3xl text-xl font-bold text-blue-600 sm:mb-2 mb-1">Create Your Resume</h1>
          <p className="text-gray-600 text-sm sm:text-md">Fill out each section step by step to build your professional resume</p>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="sm:hidden sm:mb-6 mb-4 text-center">
          <progress
            className="w-full h-2 rounded-full overflow-hidden"
            value={(currentStep / (steps.length - 1)) * 100}
            max={100}
          ></progress>
          <p className="text-sm mt-2 text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Top Navigation Buttons (Visible on sm+ screens) */}
        <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`flex items-center px-4 py-2 rounded-full border-2 text-sm font-medium transition-all
                  ${isCurrent
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : isCompleted
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                  }`}
              >
                 <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2
                  ${isCurrent
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'}`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {step.title}
              </button>
            );
          })}
        </div>

        {/* Main Form Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
          {/* Step Header */}
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
            {React.createElement(currentStepData.icon, { className: "w-8 h-8 text-blue-600" })}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{currentStepData.title}</h2>
              <p className="text-gray-600 text-sm">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>

          {/* Current Step Form Section */}
          <div className="mb-8">
            <CurrentStepComponent />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto
                ${currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Step Indicator Circles */}
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-600 w-4'
                      : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <button onClick={mobileView ? completeResume : saveResume } className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                {mobileView? "Complete Resume" : "Generate PDF"}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg w-full sm:w-auto"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
