import * as React from 'react';
import { FileText, Edit3, Trash2 } from 'lucide-react';

type SavedResumeUIProps = {
  jobTitle: string;
  onClick?: () => void;
  onDelete?: () => void;
  templateDesign?: string;
  template: string;
};

const SavedResumeUI: React.FC<SavedResumeUIProps> = ({
  jobTitle,
  onClick,
  onDelete,
  templateDesign,
  template,
}) => {
  return (
    <div className="text-center">
      <div
        onClick={onClick}
        className="group relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {jobTitle}
                </h3>
                {templateDesign && (
                  <span className="mt-1 inline-block px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                    {templateDesign}
                  </span>
                )}
              </div>
            </div>

            <button
              title="Edit Resume"
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Resume Preview Skeleton */}
          <div className="space-y-3 mb-4">
            <div className="space-y-2">
              <div className="h-3 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-5/6 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-4/6 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-3" />

            <div className="space-y-2">
              <div className="h-3 w-2/3 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-3/4 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-1/2 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-3/4 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
              <div className="h-3 w-1/2 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-blue-600 font-medium">View → {template}</span>
            </div>
          </div>
        </div>

        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Template ID + Delete */}
      <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span>{template}</span>
        {onDelete && (
          <button
            onClick={onDelete}
            title="Delete Resume"
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SavedResumeUI;
