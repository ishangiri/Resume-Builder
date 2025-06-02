import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth/authStore'
import { useNavigate } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import SavedResumeUI from '../components/SavedResumeUI';
import CreateNewResume from '../components/CreateNewResume';
import { FileText, Plus } from 'lucide-react';
import { ProtectedRoute } from '../components/ProtectedRoute';

function RouteComponent() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
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

        {/* Stats Cards - Optional */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Total Resumes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">85%</p>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Resumes</h2>
            <p className="text-gray-600">Create new resumes or edit your existing ones.</p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create New Resume - Always First */}
            <div className="order-1">
              <CreateNewResume onClick={() => navigate({ to: "/" })} />
            </div>

            {/* Saved Resumes */}
            <div className="order-2">
              <SavedResumeUI 
                jobTitle='Frontend Developer' 
                onClick={() => navigate({ to: "/" })}
                lastModified="2 days ago"
                templateType="Modern"
              />
            </div>

            <div className="order-3">
              <SavedResumeUI 
                jobTitle='Full Stack Engineer' 
                onClick={() => navigate({ to: "/" })}
                lastModified="1 week ago"
                templateType="Professional"
              />
            </div>

            <div className="order-4">
              <SavedResumeUI 
                jobTitle='React Developer' 
                onClick={() => navigate({ to: "/" })}
                lastModified="3 days ago"
                templateType="Creative"
              />
            </div>

            {/* Add more resume cards as needed */}
          </div>

          {/* Empty State - Show when no resumes */}
          {/* Uncomment this section if you want to show empty state
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started!</p>
            <CreateNewResume onClick={() => navigate({ to: "/" })} />
          </div>
          */}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})