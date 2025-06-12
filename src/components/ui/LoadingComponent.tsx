import React from 'react';

type SpinnerSize = "small" | "medium" | "large";

interface LoadingOverlayProps {
  isVisible?: boolean;
  message?: string;
  spinnerSize?: SpinnerSize;
  backgroundColor?: string;
  spinnerColor?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible = false, 
  message = "Loading...", 
  spinnerSize = "medium",
  backgroundColor,
  spinnerColor
}) => {
  const sizeClasses: Record<SpinnerSize, string> = {
    small: "w-6 h-6 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backgroundColor}`}>
      <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center space-y-4 max-w-sm mx-4">
        <div className={`animate-spin rounded-full ${sizeClasses[spinnerSize]} ${spinnerColor} border-t-transparent`}></div>
        <p className="text-gray-700 font-medium text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;