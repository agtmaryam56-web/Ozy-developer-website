import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, Smartphone, Users, Check, AlertCircle } from 'lucide-react';

interface OrderSecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChanged?: (settings: { requirePhoneOtpForUnknownOrders: boolean }) => void;
}

export const OrderSecuritySettingsModal: React.FC<OrderSecuritySettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChanged,
}) => {
  const [requirePhoneOtp, setRequirePhoneOtp] = useState<boolean>(true);
  const [captureGenderAndFlag, setCaptureGenderAndFlag] = useState<boolean>(true);
  const [blockUnknownSpam, setBlockUnknownSpam] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/settings/order-security')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setRequirePhoneOtp(data.settings.requirePhoneOtpForUnknownOrders);
          setCaptureGenderAndFlag(data.settings.captureGenderAndFlag);
          setBlockUnknownSpam(data.settings.blockUnknownSpam);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/settings/order-security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirePhoneOtpForUnknownOrders: requirePhoneOtp,
          captureGenderAndFlag,
          blockUnknownSpam,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveMessage('Order security settings saved and applied to live backend database!');
        if (onSettingsChanged) {
          onSettingsChanged({ requirePhoneOtpForUnknownOrders: requirePhoneOtp });
        }
        setTimeout(() => {
          setSaveMessage(null);
          onClose();
        }, 1500);
      }
    } catch {
      setSaveMessage('Settings updated locally.');
      setTimeout(() => {
        setSaveMessage(null);
        onClose();
      }, 1500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c111c] border border-emerald-900/50 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Website Order Security Settings
              </h2>
              <p className="text-xs text-slate-400">
                Configure verification for unknown visitors before order placement
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

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {saveMessage && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveMessage}</span>
            </div>
          )}

          {/* Setting 1: Require Phone OTP for Unknown People */}
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">
                    Require Phone OTP Sign-Up for Unknown Customers
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When enabled, unauthenticated visitors who attempt to order on Gojaba Bakery or the website must verify their phone with demo OTP before order submission.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setRequirePhoneOtp(!requirePhoneOtp)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  requirePhoneOtp ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={requirePhoneOtp}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    requirePhoneOtp ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Current Enforcement Mode:</span>
              <span className={requirePhoneOtp ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                {requirePhoneOtp ? 'MANDATORY OTP VERIFICATION' : 'GUEST ORDERING PERMITTED'}
              </span>
            </div>
          </div>

          {/* Setting 2: Country Flag & Gender Demographic Capture */}
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-semibold text-white">
                  Capture Gender & Country Flag on Order
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stores verified demographic indicators (Male 👨 / Female 👩 / Other 🧑 and Country 🇵🇰) with each order transaction in the database.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCaptureGenderAndFlag(!captureGenderAndFlag)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                captureGenderAndFlag ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={captureGenderAndFlag}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  captureGenderAndFlag ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Setting 3: Anti-Spam Database Protection */}
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">
                  Anti-Spam Ghost Order Prevention
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rejects blank or automated script orders that do not carry a valid phone verification payload.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setBlockUnknownSpam(!blockUnknownSpam)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                blockUnknownSpam ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
              role="switch"
              aria-checked={blockUnknownSpam}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  blockUnknownSpam ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving Policy...' : 'Save & Enforce Setting'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
