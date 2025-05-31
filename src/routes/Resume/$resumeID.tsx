import { createFileRoute } from '@tanstack/react-router'
import { useReactToPrint } from 'react-to-print';
import ProfessionalTemplate from '../../Resumes/ProfessionalResume';
import ModernTemplate from '../../Resumes/ModernResume';
import TemplateCreative from '../../Resumes/CreativeResume';
import  ResumeTemplate    from '../../Resumes/MCreativeResume';
import { useRef } from 'react';
import ResumeForm from '../../components/ResumeForm';
import { useParams } from '@tanstack/react-router';
import Navbar from '../../components/Navbar';
import { useAuthStore } from '../../store/authStore';
import ResumePreview from '../../components/ResumePreview';
import { useNavigate } from '@tanstack/react-router';
import Button2 from '../../components/ui/Button2';
import { FileUp, Download  } from 'lucide-react';
import MinimalDesign from '../../Resumes/MinimalDesign';
import GraciousLook from '../../Resumes/GraciousLook';
import ModernLook from '../../Resumes/ModernLook';
function Resumepage() {
  const {user} = useAuthStore()
  const { resumeID } = useParams({ from: '/Resume/$resumeID' });
  const navigate = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

const templates = [
  { src: '/Professional.png', resumeID: 'Professional' },
  { src: '/Modern.svg', resumeID: 'Modern' },
  { src: '/Creative.svg', resumeID: 'Creative' },
  { src: '/Bold.svg', resumeID: 'Bold' },
  {src: '/Minimal.svg', resumeID: 'Minimal'},
  {src : '/Gracious.svg', resumeID : 'Gracious'},
  {src : '/ModernLook.svg', resumeID : 'ModernLook'}
]

  const savePDF = () => {
    if(!user){
      alert("Please Login to save pdf.")
    } else {
      //saving resume logic...
      console.log("Saving");
      
    }
  }


  const chooseResumeTemplate = () => {
    switch (resumeID) {
      case 'Professional':
        return <ProfessionalTemplate  ref={contentRef} />;
      case 'Modern':
        return <ModernTemplate ref={contentRef} />;
      case 'Bold':
        return <TemplateCreative ref={contentRef} />;
      case 'Creative':
        return <ResumeTemplate ref={contentRef} />;
      case 'Minimal':
        return <MinimalDesign ref={contentRef} />;
      case 'Gracious':
        return <GraciousLook ref={contentRef} />;
      case 'ModernLook':
        return <ModernLook ref={contentRef} />
        default:
        return <div className="text-center text-gray-500">No template selected</div>;
    }
  }
  
  return (
    <div>
      <Navbar />
      {/* Main Container */}
    <div className="flex  bg-gray-100">
      {/* Left Side - Form */}
     <div className="w-1/2 p-6 bg-white shadow-lg h-screen overflow-y-auto scroll-smooth">
  <div className="max-w-full mx-auto space-y-6">
    <ResumeForm />

    <div>
      <p className='text-center mt-8 mb-2 font-bold text-blue-500'>Choose another template</p>
      <div className='flex flex-row overflow-x-auto space-x-4 pb-4'>
        {templates.map((template) => (
          <ResumePreview
            key={template.resumeID}
            src={template.src}
            chooseResume={() => navigate({ to: `/Resume/${template.resumeID}` })}
          />
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Right Side - Resume Preview */}
      <div className="w-1/2 bg-gray-100 p-4">
        <div className="max-h-full flex flex-col">
          <div className='flex flex-row items-center justify-around p-2'>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
            <p className="text-xs text-gray-500">Changes will appear here in real-time</p>
          </div>
             <div>
            <Button2 onSubmit={reactToPrintFn} text= {<><FileUp />PDF</>} />
          </div>
              <div>
            <Button2 onSubmit={savePDF} text={<><Download />Save</>} />
          </div>
          </div>
          
          {/* Resume Container - fits exactly in viewport */}
          <div className="flex-1 bg-white rounded-lg shadow-xl h-screen overflow-y-auto flex items-center justify-center">
            <div style={{ width: '100%', height: '100%' }}>
              <div className="w-full h-screen items-center">
              {chooseResumeTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export const Route = createFileRoute('/Resume/$resumeID')({
  component: Resumepage,
});