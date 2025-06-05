import React from 'react';
import { FileText, Edit3 } from 'lucide-react';

type SavedResumeUIProps = {
  jobTitle: string;
  onClick?: () => void;
  templateDesign?: string;
  template: string;
};

const SavedResumeUI: React.FC<SavedResumeUIProps> = ({ 
  jobTitle, 
  onClick, 
  templateDesign,
  template
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      <div className="p-6">
        {/* Header with icon and edit button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {jobTitle}
              </h3>
              <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                {templateDesign}
              </span>
            </div>
          </div>
          
          <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Resume preview skeleton */}
        <div className="space-y-3 mb-4">
          <div className="space-y-2">
            <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-5/6 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-4/6 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-3"></div>
          
          <div className="space-y-2">
            <div className="w-2/3 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-3/4 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-1/2 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-3/4 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
            <div className="w-1/2 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Footer with last modified */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-blue-500 font-medium">View →{template}</span>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SavedResumeUI;