import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, Edit3, PieChart, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 font-sans flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-800/20 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 p-2 rounded-lg">
            <LinkIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Linkly</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-primary-500/20"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
          Share your links, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
            your way
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          The ultimate link-in-bio tool for developers and creators. Customize your profile, drag-and-drop your social links, and track your audience—all in one place.
        </p>
        <Link 
          to="/register" 
          className="group flex items-center gap-2 bg-white text-dark-bg hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-all"
        >
          Get Started for Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>

      {/* Feature Highlights */}
      <section className="container mx-auto px-6 py-20 relative z-10 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Edit3 className="text-primary-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Customizable Profile</h3>
            <p className="text-slate-400 leading-relaxed">
              Design a beautiful, personalized landing page that represents your personal brand perfectly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <LinkIcon className="text-primary-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Drag-and-Drop Links</h3>
            <p className="text-slate-400 leading-relaxed">
              Easily reorder and manage all your social profiles and important URLs with a simple drag-and-drop interface.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <PieChart className="text-primary-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Analytics Tracking</h3>
            <p className="text-slate-400 leading-relaxed">
              Understand your audience. Track clicks, views, and engagement to optimize your link strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10">
        <p>&copy; {new Date().getFullYear()} Linkly. All rights reserved.</p>
      </footer>
    </div>
  );
};
