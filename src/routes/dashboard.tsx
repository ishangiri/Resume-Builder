import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth/authStore'
import { useNavigate } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import SavedResumeUI from '../components/SavedResumeUI';
import CreateNewResume from '../components/CreateNewResume';
import { ProtectedRoute } from '../components/ProtectedRoute';
import useFetchResume from '../hooks/useFetchResume';
import type { AxiosError, AxiosResponse } from 'axios';



interface ResumeContent {
  JobTitle?: string;
  // add other properties as needed
}

interface ResumeData {
  resume: {
    title: string,
    content: ResumeContent,
    id: string
  },
  theme: [
    {
     name: string,
    settings: object
    }
  ],
}

function RouteComponent() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const userId = user?.uid;
  const { data, isLoading, isError, error, isFetched } = useFetchResume(userId);

  // Extract resumes array from API response
  const resumes: ResumeData[] = (data && 'data' in data) ? (data as AxiosResponse).data : [];

  // Handle loading state
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="text-center py-12 text-blue-500">Loading your resumes...</div>
        </div>
      </ProtectedRoute>
    );
  }

  const status = (error && 'response' in error && (error as AxiosError).response) ? (error as unknown).response.status : undefined
//if error is not 404 (missing user in db) then show this UI
 if (isError && status !== 404){
  return(
       <ProtectedRoute>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="text-center py-12 text-red-500">Server not responding... Refresh the page</div>
        </div>
      </ProtectedRoute>
  )
 }

 if(isFetched){
     for(let i = 0; i < resumes.length; i ++){
         console.log(resumes[i].resume.content)
         console.log(resumes[i].theme[i].settings);
         
     }
  
 }

  // Normal UI (no error)
return (
  <ProtectedRoute>
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Main Content */}
      <div className="pt-4 pb-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your resumes and create new ones to land your dream job.
            </p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resumes.length > 0 ? (
            <>
              {/* Section Heading */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Resumes</h2>
                <p className="text-gray-600">Create new resumes or edit your existing ones.</p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                <CreateNewResume onClick={() => navigate({ to: "/" })} />
                {resumes.map((resume) => (
                  <SavedResumeUI
                    key={resume.resume.id}    
                    jobTitle={resume.resume.content.JobTitle || 'Untitled'}
                    onClick={() => navigate({ to: `/Resume/edit/${resume.resume.id}` })}
                    templateType={resume?.theme?.[0]?.name || 'Default'}
                  />
                ))}
              </div>
            </>
          ) : (
            // Empty State
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
              <p className="text-gray-600 mb-6">Create your first resume to get started!</p>
              <CreateNewResume onClick={() => navigate({ to: "/" })} />
            </div>
          )}
        </div>
      </div>
    </div>
  </ProtectedRoute>
);

}


export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});
