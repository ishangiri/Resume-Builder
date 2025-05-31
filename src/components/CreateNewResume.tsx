import React from 'react';
import { Plus, Sparkles, Zap } from 'lucide-react';

type NewResumeProps = {
  onClick?: () => void;
};

const CreateNewResume: React.FC<NewResumeProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full max-w-sm bg-gradient-to-br from-white to-blue-50/30 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating sparkles effect */}
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300 delay-150">
        <Zap className="w-3 h-3 text-blue-400 animate-pulse" />
      </div>

      <div className="relative p-6">
        {/* Header with animated plus icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
            {/* Pulse ring effect */}
            <div className="absolute inset-0 bg-blue-400 rounded-2xl opacity-30 group-hover:animate-ping"></div>
          </div>
        </div>

        {/* Title and description */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
            Create New Resume
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
            Start building your professional resume
          </p>
        </div>

        {/* Preview skeleton with enhanced styling */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="w-full h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500"></div>
            <div className="w-5/6 h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500 delay-75"></div>
            <div className="w-4/6 h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500 delay-150"></div>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-4 group-hover:via-blue-400 transition-colors duration-300"></div>
          
          <div className="space-y-2">
            <div className="w-2/3 h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500 delay-200"></div>
            <div className="w-3/4 h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500 delay-300"></div>
            <div className="w-1/2 h-3 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 rounded-md group-hover:from-blue-200 group-hover:via-blue-200 group-hover:to-blue-200 transition-all duration-500 delay-400"></div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <span>Get Started</span>
            <Plus className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
    </div>
  );
};

export default CreateNewResume;