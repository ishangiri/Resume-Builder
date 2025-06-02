import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { LogIn, UserPlus, Book, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/auth/authStore'; // Adjust the import path as necessary
import { logout } from '../Firebase/auth';
import Logo from './Logo';


const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate()

    const handleLogOut = async () => {
        await logout();
        navigate({ to: '/' });
    }

    const handleDashboard = () => {
        navigate({ to: '/dashboard' });
        setIsProfileOpen(false);
    };

    const getUserInitial = (username : string | undefined) => {
        return username ? username.charAt(0).toUpperCase() : '';
    };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
          <Logo />
          </div>

          {/* Navigation - Right Side */}
          {user ? (
            <div className="relative">
              {/* Profile Dropdown Button */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {/* User Avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-sm">
                    {getUserInitial(user?.username)}
                  </span>
                </div>
                
                
                {/* Dropdown Arrow */}
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  
                  {/* Dropdown Content */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleDashboard}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3" />
                        Dashboard
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate({ to: '/' });
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        <Book className="w-4 h-4 mr-3" />
                       Resume Builder
                      </button>
                    </div>
                    
                    {/* Logout Section */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Auth Buttons for Non-logged in Users */
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate({ to: '/AuthRoutes/loginpage' })}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              
              <button
                onClick={() => navigate({ to: '/AuthRoutes/registerpage' })}
                className="flex items-center px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;