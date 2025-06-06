// External libraries
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from 'react';
import { FileUp, Download, Eye, Edit, Palette, Layout } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { templates } from '../../utils/constant';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

// Resume templates
import {
  ProfessionalTemplate,
  ModernTemplate,
  ResumeTemplate,
  MinimalDesign,
  GraciousLook,
  ModernLook
} from '../../Resumes';


// Components & UI
import { ResumeForm, Navbar, ResumePreview, ThemeSelector } from '../../components';
import  Button2  from '../../components/ui/Button2';

// Store
import { useAuthStore } from '../../store/auth/authStore';
import { useResumeData } from '../../hooks/useResumeData';
import { useUnifiedThemeStore } from '../../hooks/useUnifiedThemeStore';

//hooks
import {useSaveResume} from '../../hooks/useSaveResume';

function Resumepage() {
  // Dialog state for authentication
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  // Mobile view state - controls which view is active on mobile (form/theme/template/preview)
  const [mobileActiveView, setMobileActiveView] = useState<'form' | 'theme' | 'template' | 'preview'>('form');
  
  // Desktop left panel state - controls which tab is active in desktop left panel (form/theme/template)
  const [desktopLeftTab, setDesktopLeftTab] = useState<'form' | 'theme' | 'template'>('form');

  const { resumeID } = useParams({ from: '/Resume/$resumeID' });
  console.log(resumeID);
  
  const navigate = useNavigate();

   const {user} = useAuthStore()
  const resumeData  = useResumeData();
  const theme = useUnifiedThemeStore(resumeID);
  const settings = theme?.store.theme
  const presets = theme?.presets
//getting the themeName using Object.entries method in the presets of the themestore
  const themeName : string | undefined = presets && 
  Object.entries(presets).find(([_, theme]) => JSON.stringify(theme) === JSON.stringify(settings))?.[0] 
   
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });


  //calling hook useSaveResume
    const { mutate, isPending, } = useSaveResume();
    const [showSavedDialog, setShowSavedDialog] = useState<boolean>(false);
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);


  //add template value to save in resumedata so when the user clicks on resume to edit they can go back to the same template they saved with their resume data. 

  const resumePayload = {
      user : {
        user_id : user?.uid,
        email : user?.email,
        },
        resume : {
          title : resumeData.JobTitle,
          content : resumeData,
          template : resumeID,
        } ,
        theme : {
               name : themeName || "Custom Theme",
              settings : settings
            }
      }

  const savePDF = () => {
    if(!user){
      setShowDialog(true)
    } else {
      try{
        setShowErrorDialog(false)
        setShowSavedDialog(false)
        console.log(resumePayload)
       mutate(resumePayload, {
         onSuccess: () => setShowSavedDialog(true),
         onError : () => setShowErrorDialog(true)
       });
      } catch(e){
        console.log(e); 
      }
    }
  }



  const chooseResumeTemplate = () => {
    switch (resumeID) {
      case 'Professional':
        return <ProfessionalTemplate  ref={contentRef} />;
      case 'Modern':
        return <ModernTemplate ref={contentRef} />;
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

  // Function to render the content based on active tab/view
  const renderLeftPanelContent = () => {
    // On mobile, use mobileActiveView; on desktop, use desktopLeftTab
    const activeTab = window.innerWidth < 1024 ? mobileActiveView : desktopLeftTab;
    
    switch (activeTab) {
      case 'form':
        return <ResumeForm />;
      
      case 'theme':
        return (
          <div className="flex justify-center items-center">
            <ThemeSelector template={resumeID} />
          </div>
        );
      
      case 'template':
        return (
          <div>
            <p className='text-center mb-4 font-bold text-blue-500'>Choose a different template</p>
            <div className='flex flex-col overflow-y-auto'>
              {templates.map((template) => (
                <ResumePreview
                  key={template.resumeID}
                  src={template.src}
                  chooseResume={() => navigate({ to: `/Resume/${template.resumeID}` })}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return <ResumeForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* CSS styles for resume preview scaling - unchanged from previous version */}
      <style>{`
        .resume-preview-container {
          width: 100%;
          transform-origin: top center;
          transition: transform 0.2s ease-in-out;
        }
        
        /* Mobile and tablet scaling */
        @media (max-width: 1023px) {
          .resume-preview-container {
            transform: scale(0.80);
            transform-origin: top center;
          }
        }
        
        /* Small mobile scaling */
        @media (max-width: 480px) {
          .resume-preview-container {
            transform: scale(0.50);
            transform-origin: top left;
          }
        }
        
        /* Desktop - no scaling */
        @media (min-width: 1024px) {
          .resume-preview-container {
            transform: scale(1);
            transform-origin: top center;
          }
        }
      `}</style>

      {/* Authentication Dialog*/}
      <Dialog 
       isOpen = {showDialog}
       type='info'
       closeOnBackdrop={true}
       onClose={() => setShowDialog(false)}
       title='User Required'
       showCloseButton = {true}
       primaryButtonText='Login'
       onPrimaryClick={() => navigate({to : "/AuthRoutes/loginpage"})}
       closeOnEscape = {true}
      >
      <p>Please Login to save resumes.</p>
      </Dialog>
       {/*Save success Dialog*/}
        <Dialog 
       isOpen = {showSavedDialog}
       type='success'
       closeOnBackdrop={true}
       onClose={() => setShowSavedDialog(false)}
       title='Resume Saved Successfully'
       showCloseButton = {false}
       primaryButtonText='Ok'
       primaryButtonVariant='green'
       onPrimaryClick={() => navigate({to : "/dashboard"})}
       closeOnEscape = {true}
      >
      <p>Resume Saved Successfully.</p>
      </Dialog>
      {/*Save error Dialog*/}
         <Dialog 
       isOpen = {showErrorDialog}
       type='error'
       closeOnBackdrop={true}
       onClose={() => setShowErrorDialog(false)}
       title='Error Saving Resume'
       showCloseButton = {false}
       primaryButtonVariant='red'
       primaryButtonText='Ok'
       secondaryButtonText='Try Again'
       onSecondaryClick={() => savePDF()}
       onPrimaryClick={() => setShowErrorDialog(false)}
       closeOnEscape = {true}
      >
      <p>Something Went Wrong While Saving Resume</p>
      </Dialog>
      
      <Navbar />
      
      {/* Mobile Navigation - Now includes all 4 options: Form, Theme, Template, Preview */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-2 py-3">
        <div className="grid grid-cols-4 gap-1">
          {/* Mobile Form Tab */}
          <button
            onClick={() => setMobileActiveView('form')}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
              mobileActiveView === 'form'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Edit className="w-4 h-4 mb-1" />
            Form
          </button>

          {/* Mobile Theme Tab */}
          <button
            onClick={() => setMobileActiveView('theme')}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
              mobileActiveView === 'theme'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Palette className="w-4 h-4 mb-1" />
            Theme
          </button>

          {/* Mobile Template Tab */}
          <button
            onClick={() => setMobileActiveView('template')}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
              mobileActiveView === 'template'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layout className="w-4 h-4 mb-1" />
            Template
          </button>

          {/* Mobile Preview Tab */}
          <button
            onClick={() => setMobileActiveView('preview')}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg font-medium transition-colors text-xs ${
              mobileActiveView === 'preview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-4 h-4 mb-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Form/Theme/Template Panel */}
        <div className={`w-full lg:w-1/2 bg-white shadow-lg ${
          mobileActiveView === 'preview' ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Desktop Tabs - Only visible on desktop screens */}
          <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
            <div className="flex">
              {/* Desktop Form Tab */}
              <button
                onClick={() => setDesktopLeftTab('form')}
                className={`flex-1 flex items-center justify-center px-4 py-3 font-medium transition-colors ${
                  desktopLeftTab === 'form'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Resume
              </button>

              {/* Desktop Theme Tab */}
              <button
                onClick={() => setDesktopLeftTab('theme')}
                className={`flex-1 flex items-center justify-center px-4 py-3 font-medium transition-colors ${
                  desktopLeftTab === 'theme'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Palette className="w-4 h-4 mr-2" />
                Change Theme
              </button>

              {/* Desktop Template Tab */}
              <button
                onClick={() => setDesktopLeftTab('template')}
                className={`flex-1 flex items-center justify-center px-4 py-3 font-medium transition-colors ${
                  desktopLeftTab === 'template'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Layout className="w-4 h-4 mr-2" />
                Templates
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="h-screen overflow-y-auto scroll-smooth">
            <div className="p-4 sm:p-6 lg:max-w-full lg:mx-auto space-y-6">
              {/* Render content based on active tab */}
              {renderLeftPanelContent()}
            </div>
          </div>
        </div>

        {/* Right Side - Resume Preview */}
        <div className={`w-full lg:w-1/2 bg-gray-100 ${
          mobileActiveView === 'preview' ? 'block' : 'hidden lg:block'
        }`}>
          <div className="h-screen flex flex-col">
            {/* Header with PDF and Save controls */}
            <div className='flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 bg-white border-b border-gray-200'>
              <div className="mb-2 sm:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
                <p className="text-xs text-gray-500">Changes will appear here in real-time</p>
              </div>
              
              {/* Action buttons for PDF generation and saving */}
              <div className="flex space-x-2">
                <Button2 
                  onSubmit={reactToPrintFn} 
                  text={
                    <div className="flex items-center space-x-1">
                      <FileUp className="w-4 h-4" />
                      <span className="hidden sm:inline">PDF</span>
                    </div>
                  } 
                />
                <Button2 
                  onSubmit={savePDF} 
                   text={
                           isPending === true ? (
                             <LoadingSpinner size="sm" text="Saving..." />
                                                         ) : (
                                   <div className="flex items-center space-x-1">
                                     <Download className="w-4 h-4" />
                                   <span className="hidden sm:inline">Save</span>
                                   </div>
                                    )
                        } 
                />
              </div>
            </div>
            
            {/* Resume Preview Container with responsive scaling */}
            <div className="flex-1 bg-white mx-2 mb-2 rounded-lg shadow-xl overflow-y-auto">
              <div className="w-full h-full flex items-start justify-center p-1 sm:p-4">
                <div className="w-full max-w-full overflow-hidden">
                  <div className="resume-preview-container">
                    {chooseResumeTemplate()}
                  </div>
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