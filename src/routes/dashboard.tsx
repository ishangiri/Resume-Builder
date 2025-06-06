import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth/authStore'
import { useNavigate } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import SavedResumeUI from '../components/SavedResumeUI';
import CreateNewResume from '../components/CreateNewResume';
import { ProtectedRoute } from '../components/ProtectedRoute';
import {useFetchResume, fetchResumeById} from '../hooks/useFetchResume';
import type { AxiosError, AxiosResponse } from 'axios';
import { useResumeStore } from '../store/ResumeStore';
import type { fetchedResumes } from '../types/fetchedData';
import type { ResumeData } from '../types/fetchedData';
import type { fetchedData } from '../types/fetchedData';
import { getTemplateTheme } from '../utils/getTemplatesTheme';



function RouteComponent() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const resetData = useResumeStore((state) => state.resetResume)

  const userId = user?.uid;
  const { data, isLoading, isError, error } = useFetchResume(userId);

  // Extract resumes array from API response
  const resumes: fetchedResumes[] = (data && typeof data === 'object' && data !== null && 'data' in data) ? (data as AxiosResponse).data : [];

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

  const status = (error && 'response' in error && (error as AxiosError).response) ? (error as any).response.status : undefined
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

  const fetchAndRoute = async (id : string) => {
    try{
       const data   =    await fetchResumeById(id)
       const oneResume: ResumeData[] = (data && typeof data === 'object' && data !== null && 'data' in data) ? (data as AxiosResponse).data : [];
       const content = oneResume[0]?.resume.content as fetchedData
       const template = oneResume[0]?.resume.template
       const theme = oneResume[0]?.theme[0].settings
       console.log(theme);
       const updateTheme = getTemplateTheme(template) as any;
       if(!content || !template || !theme || !updateTheme){
             console.log("Could not fetch data");
             throw new Error("Could not fetch data")
       }else {
          useResumeStore.getState().loadResume(content);
        updateTheme.getState().loadTheme(theme)
        navigate({to : `/Resume/${template}`})
       }
      }catch(error : unknown){
       console.log(error);
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
                 <CreateNewResume onClick={
                () => {
                  navigate({ to: "/" })
                   resetData();  
                }} />
                {resumes.map((resume) => (
                  <SavedResumeUI
                    key={resume.resume.id}    
                    jobTitle={resume.resume.title || 'Untitled'}
                    onClick={() => fetchAndRoute(resume.resume.id)}
                    templateDesign={resume?.theme?.[0]?.name || 'Default'}
                    template = {resume?.resume.template}
                  />
                ))}
              </div>
            </>
          ) : (
            // Empty State
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
              <p className="text-gray-600 mb-6">Create your first resume to get started!</p>
              <CreateNewResume onClick={
                () => {
                  navigate({ to: "/" })
                   resetData();  
                }} />
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
