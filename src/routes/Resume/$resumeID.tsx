// External libraries
import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import {  Download, Eye, Edit, Palette, Layout, UploadIcon } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { templates } from '../../utils/constant';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useResumeStore } from '../../store/ResumeStore';
import { useUpdateResume } from '../../hooks/useUpdateAndDelete';
import  {RenderResumeToHTML} from '../../utils/getResumeTemplate';
import  { fetchApiPDF }  from '../../lib/fetchUtil';
import LoadingOverlay from '../../components/ui/LoadingComponent';

// Resume templates
import {
  ProfessionalTemplate,
  ModernTemplate,
  ResumeTemplate,
  MinimalDesign,
  GraciousLook,
  ModernLook,
  Academic
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

  //loading state for downloading in mobile
  const [loadingMobile, setLoadingMobile] = useState<boolean>(false);

  const { resumeID } = useParams({ from: '/Resume/$resumeID' });
  
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

  //download function for desktop browsers
  const generatePDF = useReactToPrint({ 
    contentRef: contentRef,
    documentTitle : 'Resume'
   });


  //calling hook useSaveResume
    const { mutate, isPending } = useSaveResume();
    const {mutate : updateMutate, isPending : pendingUpdate} = useUpdateResume();
    const [showSavedDialog, setShowSavedDialog] = useState<boolean>(false);
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
    const [updateDialog, setShowUpdateDialog] = useState<boolean>(false);
    const[updateErrordialog, setUpdateErrorDIalog] = useState<boolean>(false);
    const [mobileView, setMobileView] = useState<boolean>(false);

useEffect(() => {
    const handleResize = () => {
        setMobileView(window.innerWidth < 768); // You can tweak the breakpoint
    };

    // Run on initial render
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
}, []);



    //get resume id to update
    const {id : updateID} = useResumeStore();


    //update resume payload
    const updateResumePayload = {
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
    

  //save resume payload
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


  //function to save the resume created by user in desktop
  const saveResume = () => {
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

  const changeTemplate = (resumeID : string) => {
       navigate({ to: `/Resume/${resumeID}` })
       setMobileActiveView('preview');
  }




//function to update resume
  const updateResume = () => {
    if(!user || !updateID){
      setShowDialog(true)
    }
     updateMutate({
      id : updateID,
      userId : user?.uid,
      resumePayLoad : updateResumePayload
     },
     {
      onSuccess : () => setShowUpdateDialog(true),
      onError : () => setShowErrorDialog(true)
     }
    
    )
    
  }

  const completeResume = () => {
    setMobileActiveView('preview');
  }


  //function to render the selected template

  const chooseResumeTemplate = () => {
    switch (resumeID) {
      case 'Professional':
        return <ProfessionalTemplate ref={contentRef} />;
      case 'Modern':
        return <ModernTemplate ref={contentRef} />;
      case 'Creative':
        return <ResumeTemplate ref={contentRef} />;
      case 'Minimal':
        return <MinimalDesign ref={contentRef}/>;
      case 'Gracious':
        return <GraciousLook ref={contentRef}/>;
      case 'ModernLook':
        return <ModernLook ref={contentRef}/>
      case 'Academic' : 
        return <Academic ref={contentRef} />
        default:
        return <div className="text-center text-gray-500">No template selected</div>;
    }
  }


  //download function for mobile browsers
const generatePDFMobile = async () => {
  try {
    setLoadingMobile(true);

    // Render the HTML string for the resume
    const html = RenderResumeToHTML({
      templateID: resumeID,
      resumeData,
      theme: settings,
    });

    // Send HTML to the PDF microservice
    const response = await fetchApiPDF.post(
      "/generate-pdf/",
      JSON.stringify({
        title: "My Resume",
        content: html,
      }),
      {
        headers: { "Content-Type": "application/json" },
        responseType: "blob", // Receive PDF blob
      }
    );

    setLoadingMobile(false);

    const blob = new Blob([response.data], { type: "application/pdf" });

    // Compatibility fix for mobile browsers
    const isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isSafariMobile || isIOS) {
      // Safari and iOS don't allow automatic download of blobs — open in a new tab
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const opened = window.open(reader.result, "_blank");
          if (!opened) alert("Please allow popups to view the PDF.");
        } else {
          alert("Failed to generate PDF preview.");
        }
      };
      reader.readAsDataURL(blob); // Convert to base64 and open in new tab
    } else {
      // For Chrome/Firefox/Android browsers: standard download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "MyResume.pdf";
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }

  } catch (error) {
    console.error("Error generating PDF:", error);
    setLoadingMobile(false);
  }
};

  // Function to render the content based on active tab/view
  const renderLeftPanelContent = () => {
    // On mobile, use mobileActiveView; on desktop, use desktopLeftTab
    const activeTab = window.innerWidth < 1024 ? mobileActiveView : desktopLeftTab;
    
    switch (activeTab) {
      case 'form':
        return <ResumeForm saveResume={generatePDF} completeResume={completeResume}/>;
      
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
                  chooseResume={ () => changeTemplate(template.resumeID)}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return <ResumeForm saveResume={generatePDF} completeResume={completeResume} />;
    }
  };

  return (
    <div className="min-h-screen">
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
        @media (max-width: 500px) {
          .resume-preview-container {
            transform: scale(0.42);
            transform-origin: top left;
          }
        }
        
        /* Desktop - desktop scaling */
        @media (min-width: 1024px) {
          .resume-preview-container {
            transform: scale(0.70);
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
       onSecondaryClick={() => saveResume()}
       onPrimaryClick={() => setShowErrorDialog(false)}
       closeOnEscape = {true}
      >
      <p>Something Went Wrong While Saving Resume</p>
      </Dialog>
        <Dialog 
       isOpen = {updateDialog}
       type='success'
       closeOnBackdrop={true}
       onClose={() => setShowUpdateDialog(false)}
       title='Resume Updated'
       showCloseButton = {false}
       primaryButtonText='Ok'
       primaryButtonVariant='green'
       onPrimaryClick={() => navigate({to : "/dashboard"})}
       closeOnEscape = {true}
      >
      <p>Resume Updated Successfully.</p>
      </Dialog>
         <Dialog 
       isOpen = {updateErrordialog}
       type='error'
       closeOnBackdrop={true}
       onClose={() => setUpdateErrorDIalog(false)}
       title='Resume Updated'
       showCloseButton = {false}
       primaryButtonText='Ok'
       secondaryButtonText='Try Again'
       onSecondaryClick={() => updateResume()}
       primaryButtonVariant='red'
       onPrimaryClick={() => setUpdateErrorDIalog(false)}
       closeOnEscape = {true}
      >
      <p>Something went wrong while updating resume.</p>
      </Dialog>
<LoadingOverlay spinnerSize='large'   message='Downloading Pdf.....' backgroundColor='white' isVisible={loadingMobile} />
      <Navbar />
      
      {/* Mobile Navigation -with options : Form, Theme, Template, Preview */}
      <div className="lg:hidden bg-white border-b border-gray-200  py-2 px-2">
        <div className="grid grid-cols-4 gap-1">
          {/* Mobile Form Tab */}
          <button
            onClick={() => setMobileActiveView('form')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg font-medium transition-colors text-xs ${
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
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg font-medium transition-colors text-xs ${
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
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg font-medium transition-colors text-xs ${
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
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg font-medium transition-colors text-xs ${
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
            <div className="sm:p-6 max-w-full mx-auto space-y-6">
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
         <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
  {/* Left: Title and subtitle */}
  <div className="mb-3 sm:mb-0 text-center sm:text-left">
    <h2 className="text-lg font-semibold text-gray-700"> {mobileActiveView === 'preview' ? 'Preview' : 'Live Preview'}</h2>
    <p className="text-xs text-gray-500">Changes will appear here in real-time</p>
  </div>

  {/* Right: Action buttons (always horizontal) */}
  <div className="flex flex-row items-center gap-2">
    <Button2 
      onSubmit={saveResume}
      text={
        isPending ? (
          <LoadingSpinner size="sm" text="Saving..." />
        ) : (
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span className="sm:inline">Save Online</span>
          </div>
        )
      } 
    />
    {mobileView && ( <Button2 
      onSubmit={generatePDFMobile}
      text={
 ( <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span className="sm:inline">Download PDF</span>
          </div>
        )
      } 
    />)}

    {updateID !== 0 && user && (
      <Button2
        onSubmit={updateResume}
        text={
          pendingUpdate ? (
            <LoadingSpinner size="sm" text="Updating..." />
          ) : (
            <div className="flex items-center gap-1">
              <UploadIcon className="w-4 h-4" />
              <span className="sm:inline">Update Resume</span>
            </div>
          )
        }
      />
    )}
  </div>
</div>
            {/* Resume Preview Container with responsive scaling */}
            <div className="flex-1 bg-gradient-to-br from-slate-200 to-blue-500 p-2 mb-2 rounded-lg shadow-xl overflow-y-auto">
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