import { createFileRoute } from '@tanstack/react-router'
import ResumePreview from '../components/ResumePreview';
import { useNavigate } from '@tanstack/react-router'
import Navbar from '../components/Navbar';
import { templates } from '../utils/constant';
function App() {

  const navigate = useNavigate();

   return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Header Section */}
      <div className="flex flex-row items-center justify-center bg-gray-100 gap-4 p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-blue-500">Choose a template to get started</h1>
        </div>
      </div>

      {/* Templates Section */}
      <div className="flex flex-wrap items-center justify-center gap-12 px-8 pb-8">
       {templates.map(template =>  (
          <ResumePreview
          key={template.resumeID}
          src={template.src}
          chooseResume={() => navigate({ to: `/Resume/${template.resumeID}` })}
          />
        
       ))}
      </div>
      {/* Footer Section */}
      <div className="text-center text-gray-500 text-sm py-4">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </div>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: App,
})






