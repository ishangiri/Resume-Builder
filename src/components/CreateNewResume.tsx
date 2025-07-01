import React from 'react';
import { Plus } from 'lucide-react';

type NewResumeProps = {
  onClick?: () => void;
  title : string;
  paragraph : string;
  buttonText : string
};

const CreateNewResume: React.FC<NewResumeProps> = ({ onClick, title, paragraph, buttonText }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full max-w-sm bg-white border border-gray-200 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Icon section */}
      <div className="flex justify-center mt-6">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-transform group-hover:scale-105 duration-300">
          <Plus className="w-6 h-6" />
        </div>
      </div>

      {/* Text content */}
      <div className="text-center px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {paragraph}
        </p>
      </div>

      {/* Placeholder preview section */}
      <div className="px-6 pb-6">
        <div className="space-y-2">
          <div className="h-3 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
          <div className="h-3 w-5/6 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
          <div className="h-3 w-2/3 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
        </div>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
          <div className="h-3 w-1/2 rounded-md bg-gray-100 group-hover:bg-blue-100 transition" />
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
         {buttonText}
        </div>
      </div>
    </div>
  );
};

export default CreateNewResume;
