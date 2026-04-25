import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { usePreview } from '../context/PreviewContext';
import { useAuth } from '../context/AuthContext';
import { Image, User } from 'lucide-react';
import api from '../utils/api';
import { getFallbackAvatar } from '../utils/avatar';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  bio: z.string().max(250).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
});

export const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const { setProfilePreview, isSyncing } = usePreview();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      avatarUrl: user?.avatarUrl || '',
    }
  });

  // Subscribe to form changes and update preview without causing re-renders
  useEffect(() => {
    const subscription = watch((values) => {
      setProfilePreview({ ...user, ...values });
    });
    return () => subscription.unsubscribe();
  }, [watch, user, setProfilePreview]);

  const currentAvatar = watch('avatarUrl');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // 1. Upload to Cloudinary
      const uploadRes = await api.post('/upload/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = uploadRes.data.url;

      // 2. Update form field
      setValue('avatarUrl', imageUrl, { shouldDirty: true });

      // 3. Auto-save to database immediately
      await api.put('/profile', { avatarUrl: imageUrl });
      setUser(prev => ({ ...prev, avatarUrl: imageUrl }));
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleRemoveImage = async () => {
    setValue('avatarUrl', null, { shouldDirty: true });
    try {
      await api.put('/profile', { avatarUrl: null });
      setUser(prev => ({ ...prev, avatarUrl: null }));
    } catch (err) {
      console.error('Failed to remove image:', err);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await api.put('/profile', data);
      setUser(res.data);
      reset(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isSyncing) return null;

  return (
    <div className="flex flex-col h-full animate-fade-in relative max-w-4xl">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mt-0">Profile Details</h1>
        <p className="text-slate-400 text-base">Add your personal touch to let the world know who is behind these curated links.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 flex-1 h-full">
        
        {/* Profile Picture Card */}
        <div className="bg-dark-card p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <Image className="text-primary-400" size={24} />
            <h2 className="text-xl font-bold text-white">Profile Picture</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <div className="relative group w-32 h-32 rounded-full overflow-hidden bg-dark-bg flex items-center justify-center border-4 border-dark-bg/50 shadow-inner shrink-0">
              <img 
                src={currentAvatar || getFallbackAvatar(watch('firstName'), watch('lastName'))} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Image size={24} />
              </div>
            </div>
            
            <div className="flex flex-col gap-5">
              <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed">
                Recommended size: 400x400px. JPG, PNG or GIF. Max 2MB.
              </p>
              <div className="flex items-center gap-4">
                <label className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl cursor-pointer transition-colors text-sm border border-transparent">
                  Change Image
                  <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageUpload} />
                </label>
                <button 
                  type="button" 
                  onClick={handleRemoveImage}
                  className="px-4 py-2.5 text-red-400 hover:bg-red-500/10 font-medium rounded-xl transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-dark-card p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-primary-400" size={24} />
            <h2 className="text-xl font-bold text-white">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">First Name</label>
              <Input 
                placeholder="e.g. Alex" 
                error={errors.firstName?.message} 
                {...register('firstName')} 
                className="bg-dark-bg border-transparent text-white focus:bg-dark-bg focus:border-white/10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Last Name</label>
              <Input 
                placeholder="e.g. Rivera" 
                error={errors.lastName?.message} 
                {...register('lastName')} 
                className="bg-dark-bg border-transparent text-white focus:bg-dark-bg focus:border-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Bio</label>
            <textarea 
              placeholder="Share a little bit about yourself..." 
              {...register('bio')}
              className="w-full bg-dark-bg border border-transparent rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[120px] resize-none"
            />
            {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
          </div>

          {(isDirty || saveSuccess) && (
            <div className="flex justify-end mt-4 items-center gap-4 animate-slide-up">
              {saveSuccess && <span className="text-slate-400 font-medium animate-fade-in flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Saved!
              </span>}
              <Button 
                type="submit" 
                isLoading={isSaving} 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-slate-900 font-bold px-8 shadow-none"
              >
                Save Profile Changes
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
