import { useResumeStore } from '../../store/ResumeStore';
import Button2 from '../ui/Button2';
import { Sparkles } from 'lucide-react';
import { useResumeData } from '../../hooks/useResumeData';
import fetchApi from '../../lib/fetchUtil';
import { useState } from 'react';
import { Dialog } from '../ui/Dialog';

const SummarySection = () => {
  const summary = useResumeStore(state => state.summary);
  const setSummary = useResumeStore(state => state.setSummary);

  const resumeData = useResumeData();

  const [loading, setLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [localSummary, setLocalSummary] = useState(summary);
  const [showServerError, setShowServerError] = useState(false);

  const summaryPayload = {
    personalInfo: resumeData.personalInfo,
    JobTitle: resumeData.JobTitle,
    experience: resumeData.experience.map((exp) => ({
      jobTitle: exp.title,
      company: exp.company,
      period: `${exp.startDate} - ${exp.endDate}`,
      location: exp.location,
      description: exp.description
    })),
    education: resumeData.education.map((edu) => ({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      location: edu.location,
      details: edu.details
    })),
    skills: resumeData.skills.map((cat) => ({
      category: cat.category,
      skills: cat.skills
    })),
    projects: resumeData.projects.map((proj) => ({
      name: proj.name,
      description: proj.description
    }))
  };

  const typeSummary = (fullText: string) => {
    let index = -1;
    setSummary(""); // clear previous
    setLocalSummary(""); // clear local summary for typing effect
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setLocalSummary((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setLoading(false);
        setSummary(fullText); 
      }
    }, 20); // typing speed
  };

  const generateSummary = async () => {
    setLoading(true);
    setShowErrorDialog(false);
    setShowServerError(false);
    try {
      const response = await fetchApi.post('/generate-resume-summary', summaryPayload);
      if (response.status === 200) {
        typeSummary(response.data.summary);
      } else if (response.status === 500) {
        console.log("Server error", response.statusText);
        setShowErrorDialog(true);
       } else {
        console.error("Failed to generate summary:", response.statusText);
        setLoading(false);
        setShowServerError(true);
      }
    } catch (error: any) {
      console.error("Error generating summary:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog 
       isOpen = {showErrorDialog}
       type='error'
       closeOnBackdrop={true}
       onClose={() => setShowErrorDialog(false)}
       title='Missing Information to Generate Summary'
       showCloseButton = {false}
       primaryButtonText='Ok'
       primaryButtonVariant='red'
       closeOnEscape = {true}
      >
      <p>Please make sure to fill personal information, jobTitle, skills and education before generating AI summary.</p>
      </Dialog>
      <Dialog 
       isOpen = {showServerError}
       type='error'
       closeOnBackdrop={true}
       onClose={() => setShowServerError(false)}
       title='Server Error'
       showCloseButton = {false}
       primaryButtonText='Ok'
       primaryButtonVariant='red'
       secondaryButtonText='Retry'
       onSecondaryClick={generateSummary}
       closeOnEscape = {true}
      >
      <p>Please make sure to fill personal information, jobTitle, skills and education before generating AI summary.</p>
      </Dialog>
      <textarea
        className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white h-52"
        placeholder="Write a brief summary about yourself"
        value={loading ? localSummary : summary}
        onChange={e => {setSummary(e.target.value)
          setLocalSummary(e.target.value) // Update local state for immediate feedback
        }
      }
      />
      <div className='mt-4 flex flex-row justify-end'>
        <Button2
          onSubmit={generateSummary}
          text={
            <div className="flex items-center gap-1">
              {loading ? (
                <span className="animate-pulse">Generating...</span>
              ) : (
                <span className="flex gap-1"><Sparkles className="w-4 h-4" /> Generate AI Summary</span>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SummarySection;
