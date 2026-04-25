import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, Link2, Github, Twitter, Linkedin, Facebook, Youtube, Globe, Rocket, Monitor, Code } from 'lucide-react';
import api from '../utils/api';
import { Button } from '../components/ui/Button';

import { getFallbackAvatar } from '../utils/avatar';

export const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/public/${userId}`);
        setProfile(res.data);
      } catch (err) {
        setError('Profile not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleLinkClick = async (e, link) => {
    e.preventDefault();
    try {
      // Dispatch click event tracking
      await api.post(`/analytics/track/${link.id}`);
    } catch (err) {
      console.error('Failed to track click', err);
    } finally {
      // Regardless of tracking success, open link
      window.open(link.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-8 rounded-3xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Link2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
          <p className="text-slate-400 mb-6">The link you followed may be broken, or the profile may have been removed.</p>
          <Link to="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg font-sans antialiased text-white selection:bg-primary-500/30 flex flex-col items-center pt-24 pb-12 px-4">
      <main className="w-full max-w-[400px] flex flex-col items-center">
        {/* Glowing Avatar */}
        <div className="relative mb-6 group">
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
          
          <img 
            src={profile.avatarUrl || getFallbackAvatar(profile.firstName, profile.lastName)} 
            alt={`${profile.firstName}'s avatar`} 
            className="relative w-32 h-32 rounded-full object-cover border-4 border-dark-card shadow-2xl" 
          />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-4 tracking-tight">
          {profile.firstName} {profile.lastName}
        </h1>

        {profile.bio ? (
          <p className="text-center text-slate-300 mb-10 text-lg leading-relaxed">
            {profile.bio}
          </p>
        ) : (
          <p className="text-center text-slate-400 mb-10 text-lg">
            {profile.email}
          </p>
        )}

        {/* Links List */}
        <div className="w-full flex flex-col gap-4">
          {profile.links && profile.links.length > 0 ? (
            profile.links.map((link) => {
              const PlatformIcon = getPlatformIcon(link.platform);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="w-full relative h-[60px] rounded-2xl flex items-center justify-center text-white font-semibold text-[15px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: getPlatformColor(link.platform),
                    color: getPlatformTextColor(link.platform)
                  }}
                >
                  <div className="absolute left-6">
                    <PlatformIcon size={20} />
                  </div>
                  <span>{link.platform}</span>
                  <div className="absolute right-6">
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              );
            })
          ) : (
            <div className="text-center p-8 glass-card rounded-2xl border border-white/10">
              <p className="text-slate-400">No links added yet.</p>
            </div>
          )}
        </div>

        {/* Footer Brand */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-slate-300 font-bold">Powered by Linkly</p>
          <div className="flex gap-6 text-slate-400 text-sm font-medium">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="w-8 h-[1px] bg-slate-700 mt-2"></div>
        </div>
      </main>
    </div>
  );
};

// Helper mapping for styles
function getPlatformColor(platform) {
  const colors = {
    GitHub: '#050505',
    'Twitter / X': '#1A2035',
    Twitter: '#1A2035',
    LinkedIn: '#0077B5',
    Facebook: '#1877F2',
    YouTube: '#FF0000',
    'Personal Portfolio': '#8B8CFA', // Light purple
    FrontendMentor: '#FFFFFF',
    Twitch: '#9146FF',
    'Dev.to': '#333333',
    Codewars: '#AD2C27',
    Codepen: '#1E1F26',
    freeCodeCamp: '#302267',
    GitLab: '#EB4925',
    Hashnode: '#2962FF',
    'Stack Overflow': '#EC7100',
  };
  return colors[platform] || '#1A2035'; // default dark blue
}

function getPlatformTextColor(platform) {
  const darkText = ['FrontendMentor', 'Personal Portfolio'];
  if (darkText.includes(platform)) return '#000000';
  return '#FFFFFF';
}

function getPlatformIcon(platform) {
  switch (platform) {
    case 'GitHub': return Github;
    case 'Twitter / X': return Twitter;
    case 'Twitter': return Twitter;
    case 'LinkedIn': return Linkedin;
    case 'Facebook': return Facebook;
    case 'YouTube': return Youtube;
    case 'Personal Portfolio': return Rocket;
    case 'FrontendMentor': return Monitor;
    case 'Twitch': return Monitor;
    case 'Dev.to': return Code;
    default: return Globe;
  }
}
