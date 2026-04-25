import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link2, UserCircle, BarChart2, Share2, LogOut } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from './ui/Button';
import { ShareModal } from './ShareModal';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const navItemClass = (path) => cn(
    "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200",
    location.pathname === path
      ? "bg-primary-500/10 text-primary-400"
      : "text-slate-400 hover:text-white hover:bg-white/5"
  );

  return (
    <header className="glass-card rounded-2xl p-4 flex items-center justify-between sticky top-6 z-50">
      <div className="flex items-center gap-2 px-2 text-white font-bold text-xl tracking-tight">
        <Link2 className="w-8 h-8 p-1.5 bg-primary-500 text-white rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.3)]" />
        <span className="hidden md:block">Linkly</span>
      </div>

      <nav className="flex items-center gap-2">
        <Link to="/links" className={navItemClass('/links')}>
          <Link2 size={20} />
          <span className="hidden md:block">Links</span>
        </Link>
        <Link to="/profile" className={navItemClass('/profile')}>
          <UserCircle size={20} />
          <span className="hidden md:block">Profile Details</span>
        </Link>
        <Link to="/analytics" className={navItemClass('/analytics')}>
          <BarChart2 size={20} />
          <span className="hidden md:block">Analytics</span>
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden md:flex gap-2" onClick={() => setIsShareModalOpen(true)}>
          <Share2 size={16} />
          Share Link
        </Button>
        <Button variant="outline" size="sm" className="md:hidden px-4" onClick={() => setIsShareModalOpen(true)}>
          <Share2 size={20} />
        </Button>

        {/* Logout Button */}
        <Button variant="ghost" className="hidden md:flex gap-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" onClick={logout}>
          <LogOut size={16} />
          Logout
        </Button>
        <Button variant="ghost" size="sm" className="md:hidden px-4 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" onClick={logout}>
          <LogOut size={20} />
        </Button>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </header>
  );
};
