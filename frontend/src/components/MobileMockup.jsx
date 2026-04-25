import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getFallbackAvatar } from '../utils/avatar';

export const MobileMockup = ({ profile = {}, links = [] }) => {
  return (
    <div className="relative w-[340px] h-[680px] rounded-[50px] border-[14px] border-dark-card bg-dark-bg shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center p-6 pb-12 ring-[1px] ring-white/10 mx-auto">
      {/* Notch */}
      <div className="absolute top-0 w-[45%] h-[24px] bg-dark-card rounded-b-3xl z-10 flex justify-center items-end pb-1">
         <div className="w-12 h-1.5 bg-dark-bg rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="w-full h-full flex flex-col items-center mt-12 gap-8 overflow-y-auto no-scrollbar pb-6">
        
        {/* Profile Details Area */}
        <div className="flex flex-col items-center gap-4 w-full">
          <img 
            src={profile.avatarUrl || getFallbackAvatar(profile.firstName, profile.lastName)} 
            alt="Avatar" 
            className="w-[120px] h-[120px] rounded-full object-cover border-4 border-primary-500 shadow-[0_0_20px_rgba(20,184,166,0.3)]" 
          />
          
          <div className="flex flex-col items-center gap-2 w-full px-2 text-center">
            {profile.firstName || profile.lastName ? (
              <h2 className="text-2xl font-bold text-white truncate w-full">{profile.firstName} {profile.lastName}</h2>
            ) : (
              <div className="h-4 bg-white/10 rounded-full w-[160px] animate-pulse"></div>
            )}
            
            {profile.email ? (
              <p className="text-base text-slate-400 truncate w-full">{profile.email}</p>
            ) : (
              <div className="h-2 bg-white/10 rounded-full w-[72px] mt-1 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Links Area */}
        <div className="w-full flex flex-col gap-4">
          {links.length > 0 ? (
            links.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="w-full h-[60px] rounded-2xl flex items-center justify-between px-5 text-white font-semibold text-[15px] shadow-sm transition-transform hover:scale-[1.02] bg-slate-800"
                style={{ backgroundColor: getPlatformColor(link.platform), color: getPlatformTextColor(link.platform) }}
              >
                <div className="flex items-center gap-2">
                  <span>{link.platform}</span>
                </div>
                <ArrowRight size={16} />
              </a>
            ))
          ) : (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[60px] rounded-2xl bg-white/5 animate-pulse"></div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function getPlatformColor(platform) {
  const colors = {
    GitHub: '#1A1A1A',
    YouTube: '#EE3939',
    LinkedIn: '#2D68FF',
    Facebook: '#2442AC',
    Twitter: '#43B7E9',
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
  return colors[platform] || '#6d28d9';
}

function getPlatformTextColor(platform) {
  if (platform === 'FrontendMentor') return '#333333';
  return '#FFFFFF';
}
