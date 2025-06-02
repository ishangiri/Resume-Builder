import React from 'react';
import { X, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// Simple Dialog Component Props
interface DialogProps {
  // Required props
  isOpen: boolean;
  onClose: () => void;
  title: string;
  
  // Optional props
  children: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  
  // Footer props
  showFooter?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonVariant?: 'blue' | 'red' | 'green' | 'gray';
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'info',
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  showFooter = true,
  primaryButtonText = 'OK',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonVariant = 'blue'
}) => {
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  // Get header color based on type
  const getHeaderColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-2xl';
      default:
        return 'max-w-md';
    }
  };

  // Get button variant classes
  const getButtonVariant = (variant: string) => {
    switch (variant) {
      case 'red':
        return 'bg-red-500 hover:bg-red-600';
      case 'green':
        return 'bg-green-500 hover:bg-green-600';
      case 'gray':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-xl shadow-2xl w-full transform transition-all duration-300 ${getSizeClasses()} ${className}`}>
        {/* Header */}
        <div className={`${getHeaderColor()} text-white px-6 py-4 rounded-t-xl flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="hover:bg-black hover:bg-opacity-20 p-1 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
            {secondaryButtonText && (
              <button
                onClick={onSecondaryClick || onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                {secondaryButtonText}
              </button>
            )}
            <button
              onClick={onPrimaryClick || onClose}
              className={`${getButtonVariant(primaryButtonVariant)} text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md`}
            >
              {primaryButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo Component
const DialogDemo: React.FC = () => {
  const [dialogs, setDialogs] = React.useState({
    info: false,
    success: false,
    warning: false,
    error: false,
    custom: false
  });

  const openDialog = (type: keyof typeof dialogs) => {
    setDialogs(prev => ({ ...prev, [type]: true }));
  };

  const closeDialog = (type: keyof typeof dialogs) => {
    setDialogs(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-500 mb-8">Simple Dialog Component</h1>
        
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => openDialog('info')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Info Dialog
          </button>
          
          <button
            onClick={() => openDialog('success')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Success Dialog
          </button>
          
          <button
            onClick={() => openDialog('warning')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Warning Dialog
          </button>
          
          <button
            onClick={() => openDialog('error')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Error Dialog
          </button>
        </div>

        <button
          onClick={() => openDialog('custom')}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4"
        >
          Custom Dialog
        </button>

        {/* Info Dialog */}
        <Dialog
          isOpen={dialogs.info}
          onClose={() => closeDialog('info')}
          title="Information"
          type="info"
        >
          <p className="text-gray-700">This is a simple info dialog with blue theme.</p>
        </Dialog>

        {/* Success Dialog */}
        <Dialog
          isOpen={dialogs.success}
          onClose={() => closeDialog('success')}
          title="Success!"
          type="success"
          primaryButtonText="Great!"
        >
          <p className="text-gray-700">Your action was completed successfully!</p>
        </Dialog>

        {/* Warning Dialog */}
        <Dialog
          isOpen={dialogs.warning}
          onClose={() => closeDialog('warning')}
          title="Warning"
          type="warning"
          primaryButtonText="Proceed"
          secondaryButtonText="Cancel"
        >
          <p className="text-gray-700">Are you sure you want to continue? This action may have consequences.</p>
        </Dialog>

        {/* Error Dialog */}
        <Dialog
          isOpen={dialogs.error}
          onClose={() => closeDialog('error')}
          title="Error"
          type="error"
          primaryButtonText="Try Again"
          primaryButtonVariant="red"
        >
          <p className="text-gray-700">Something went wrong. Please try again.</p>
        </Dialog>

        {/* Custom Dialog */}
        <Dialog
          isOpen={dialogs.custom}
          onClose={() => closeDialog('custom')}
          title="Custom Configuration"
          size="lg"
          closeOnBackdrop={false}
          primaryButtonText="Save Changes"
          secondaryButtonText="Discard"
          onPrimaryClick={() => {
            alert('Changes saved!');
            closeDialog('custom');
          }}
        >
          <div className="space-y-4">
            <p className="text-gray-700">This is a larger dialog with custom settings:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Large size</li>
              <li>Cannot close by clicking backdrop</li>
              <li>Custom button actions</li>
            </ul>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DialogDemo;
export { Dialog };