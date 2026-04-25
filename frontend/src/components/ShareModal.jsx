import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';

export const ShareModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user?.id) return null;

  const profileUrl = `${window.location.origin}/u/${user.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 overflow-hidden relative pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-primary-500/10 text-primary-400 rounded-full flex items-center justify-center mb-2">
                <Share2 size={32} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Share your profile</h2>
                <p className="text-slate-400">
                  Scan the QR code or copy the link below to share your public profile with others.
                </p>
              </div>

              <div className="p-4 bg-white/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
                <QRCodeSVG
                  value={profileUrl}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#0f172a"}
                  level={"Q"}
                  includeMargin={false}
                />
              </div>

              <div className="w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Copy size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={profileUrl}
                  className="w-full pl-10 pr-24 py-3 bg-dark-bg/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono"
                />
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="absolute right-1.5 top-1.5 bottom-1.5 shadow-none group-hover:bg-primary-600 transition-colors"
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5">
                      <Check size={14} /> Copied!
                    </span>
                  ) : (
                    "Copy"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
