import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Link2, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import { Button } from '../components/ui/Button';

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Link2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
          <p className="text-slate-500 mb-6">The link you followed may be broken, or the profile may have been removed.</p>
          <Link to="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-primary-200">
      <div className="h-[350px] bg-primary-600 rounded-b-[40px] absolute top-0 left-0 right-0 z-0 hidden md:block"></div>

      <main className="relative z-10 max-w-[600px] mx-auto pt-16 md:pt-32 pb-20 px-4">
        <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-2xl border border-slate-100/50 flex flex-col items-center">

          {/* Profile Header */}
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile.firstName}'s avatar`}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-primary-600 shadow-xl mb-6 relative -top-2"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-slate-100 border-4 border-slate-50 shadow-inner flex items-center justify-center text-slate-300 mb-6 font-bold text-3xl">
              {profile.firstName?.[0] || 'U'}
            </div>
          )}

          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-primary-600 font-medium mb-4">{profile.email}</p>

          {profile.bio && (
            <p className="text-center text-slate-600 mb-10 max-w-sm leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Links List */}
          <div className="w-full flex flex-col gap-4">
            {profile.links && profile.links.length > 0 ? (
              profile.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="w-full p-4 rounded-2xl flex items-center justify-between text-white font-medium shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] bg-slate-800 group"
                  style={{
                    backgroundColor: getPlatformColor(link.platform),
                    color: getPlatformTextColor(link.platform)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{link.platform}</span>
                  </div>
                  <ExternalLink size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              ))
            ) : (
              <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-500">No links added yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Brand */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-slate-400 font-medium">
          <Link2 size={20} />
          <span>Lynkly</span>
        </div>
      </main>
    </div>
  );
};

// Extracted from MobileMockup.jsx
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
