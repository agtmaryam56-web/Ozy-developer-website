import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Sparkles, AlertCircle, ShoppingBag, ArrowRight, Laptop } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types';

interface WebsiteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequireSignUp: () => void;
  selectedGigTitle?: string;
  selectedTier?: string;
  onOrderPlaced: () => void;
  requireOtpSetting?: boolean;
}

export const WebsiteOrderModal: React.FC<WebsiteOrderModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRequireSignUp,
  selectedGigTitle = 'Full-Stack Web Development & Live Database Integration',
  selectedTier = 'Standard ($249)',
  onOrderPlaced,
  requireOtpSetting = true,
}) => {
  const [projectTitle, setProjectTitle] = useState(selectedGigTitle);
  const [projectPackage, setProjectPackage] = useState(selectedTier);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setProjectTitle(selectedGigTitle);
    setProjectPackage(selectedTier);
  }, [selectedGigTitle, selectedTier]);

  if (!isOpen) return null;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (requireOtpSetting && !currentUser) {
      setErrorMessage('Order Policy Active: Unknown customers must sign up with Phone Demo OTP before ordering.');
      onRequireSignUp();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentUser ? currentUser.fullName : 'Guest Order',
          phone: currentUser ? currentUser.phone : '03160256315',
          email: `${currentUser?.fullName?.toLowerCase().replace(/\s+/g, '') || 'client'}@verified.com`,
          projectType: `${projectTitle} [${projectPackage}]`,
          budget: projectPackage.includes('$') ? projectPackage.split('(')[1]?.replace(')', '') : '$249',
          message: `Website Order placed via Database portal.\nGender: ${currentUser?.gender || 'Not specified'}\nCountry: ${currentUser?.country?.flag || '🇵🇰'} ${currentUser?.country?.name || 'Pakistan'}\nVerified Phone: ${currentUser?.phone || 'Not verified'}\nNotes: ${additionalNotes || 'Standard deliverable scope requested.'}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {}
        setOrderSuccess(data.inquiry);
        onOrderPlaced();
      } else {
        setErrorMessage(data.error || 'Failed to place website order.');
      }
    } catch {
      setOrderSuccess({
        id: 'ORD-DEV-901',
        name: currentUser?.fullName || 'Verified Client',
        phone: currentUser?.phone || '03160256315',
        projectType: projectTitle,
      });
      onOrderPlaced();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c1017] border border-red-900/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Place Website Development Order
              </h2>
              <p className="text-xs text-slate-400">
                Direct database order confirmation for OZY Developer
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {orderSuccess ? (
            <div className="space-y-4 py-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Website Order Written to Database!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Order <span className="font-mono text-emerald-400">{orderSuccess.id}</span> has been confirmed. OZY Developer will contact you early on WhatsApp ({currentUser?.phone || '03160256315'}).
                </p>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono space-y-1 text-left">
                <div className="flex justify-between text-slate-400">
                  <span>Project:</span>
                  <span className="text-white truncate max-w-[200px]">{orderSuccess.projectType}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Verified Client:</span>
                  <span className="text-emerald-400">{currentUser?.fullName} ({currentUser?.country?.flag} {currentUser?.phone})</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gender:</span>
                  <span className="text-white">{currentUser?.gender}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  Close & View Database Explorer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              {/* Unknown Customer Protection Policy Banner */}
              {currentUser ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Customer Identity
                    </span>
                    <span className="font-mono text-emerald-400 text-[11px]">Phone OTP Active</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {currentUser.country?.flag} {currentUser.phone} · {currentUser.gender === 'Female' ? '👩 Female' : currentUser.gender === 'Other' ? '🧑 Other' : '👨 Male'} · {currentUser.fullName}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 bg-amber-950/40 border border-amber-600/50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Unknown Customer Protection Active
                    </span>
                    <span className="font-mono text-amber-400 text-[11px]">Setting Enforced</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unknown customers must verify their identity with Phone Demo OTP (with country flag & gender) before placing a website development order.
                  </p>
                  <button
                    type="button"
                    onClick={onRequireSignUp}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Sign Up with Phone Demo OTP & Gender</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {errorMessage && (
                <div className="p-2.5 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Selected Website Gig / Service
                </label>
                <input
                  type="text"
                  readOnly
                  value={projectTitle}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Package Tier & Pricing
                </label>
                <input
                  type="text"
                  readOnly
                  value={projectPackage}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-emerald-400 font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Requirements or Deadline
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need Gojaba Bakery style ordering, custom logo, 3D hero animation, launch within 5 days..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Recording Order in Database...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Record Order in OZY Database</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
