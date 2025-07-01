import { createFileRoute } from '@tanstack/react-router'
import ResumePreview from '../components/ResumePreview';
import { useNavigate } from '@tanstack/react-router'
import Navbar from '../components/Navbar';
import { templates } from '../utils/constant';
import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Sparkles,
  FileText,
  ArrowRight,
  Download,
  Eye,
  Zap,
  Upload
} from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e : any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

const features = [
  {
    icon: Zap,
    title: "AI-Powered Writing",
    description: "Let AI suggest skills and summaries based on your details",
    gradient: "from-blue-400 to-blue-500"
  },
  {
    icon: Eye,
    title: "Real-time Preview",
    description: "See changes instantly as you build your perfect resume",
    gradient: "from-blue-300 to-blue-500"
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your resume instantly in high-quality PDF",
    gradient: "from-blue-500 to-blue-700"
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-500 to-indigo-500 relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-30 pointer-events-none "
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 0, 0, 0.5), transparent 40%)`
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-6 py-2 mb-8 shadow-lg animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New: AI-Powered Resume Builder</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-slate-800">Build Your</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Perfect Resume
              </span>
              <br />
              <span className="text-slate-600 text-3xl md:text-4xl lg:text-5xl">in Minutes</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create professional resumes with our AI-powered platform.
              Choose from expert-designed templates and let AI help you craft compelling content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>

              <button
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 hover:shadow-lg"
              >
                View Templates
              </button>
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-slate-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose this Resume Builder?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powered by advanced AI technology and designed by career experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/*Announcement section */}
        <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Upload className="w-8 h-8 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Upload Existing Resume and Job Description</h3>
            </div>
            <p className="text-white/80 text-lg mb-4">
              Want to improve your existing resume or create a resume for a specific job? This feature is coming soon!
            </p>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 rounded-full px-4 py-2 border border-orange-500/30">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-300 font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              Choose A Template
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start building from scratch with AI-powered resume builder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template, _index) => (
              <div
                key={template.resumeID}
                className="group relative transform transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

                <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  <div className="relative overflow-hidden">
                    <ResumePreview
                      src={template.src}
                      chooseResume={() => navigate({ to: `/Resume/${template.resumeID}` })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                      <button
                        onClick={() => navigate({ to: `/Resume/${template.resumeID}` })}
                        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-slate-50 shadow-lg"
                      >
                        Use This Template
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Professional Resume?
          </h3>
          <button
            onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Resume Builder</span>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: App,
});


