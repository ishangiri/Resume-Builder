import { createFileRoute } from '@tanstack/react-router';
import ResumePreview from '../components/ResumePreview';
import { useNavigate } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import { templates } from '../utils/constant';

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-500 to-indigo-500">
      <Navbar />

      {/* Header Section */}
      <div className="flex flex-row items-center justify-center  gap-4 p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="md:text-3xl text-md font-bold text-blue-500">Choose a template to build.</h1>
        </div>
      </div>

      {/* Templates Section */}
      <div className="flex flex-wrap items-center justify-center gap-12 px-8 pb-8">
         {templates.map((template, _index) => (
              <div
                key={template.resumeID}
                className="group relative transform transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

                <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  <div className="relative overflow-hidden">
                    <ResumePreview
                      src={template.src}
                      chooseResume={() => navigate({ to: `/Resume/${template.resumeID}` })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                      <button
                        onClick={() => navigate({ to: `/Resume/${template.resumeID}` })}
                        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-slate-50 shadow-lg"
                      >
                        Use This Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Footer Section */}
      <div className="text-center text-gray-500 text-sm py-4">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </div>
    </div>
  );
}

export const Route = createFileRoute('/templates')({
  component: App,
});
