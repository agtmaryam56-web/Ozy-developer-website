import React, { useState } from 'react';
import { COUNTRIES } from '../data/countries';
import { CountryOption, UserProfile } from '../types';
import { X, Phone, ShieldCheck, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SignUpOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const SignUpOtpModal: React.FC<SignUpOtpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [role, setRole] = useState('Client (Need Website)');

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedSms, setSimulatedSms] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 6) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          countryCode: selectedCountry.code,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedOtp(data.demoOtp);
        setSimulatedSms(`Simulated SMS for ${data.targetPhone}: Your OZY Verification Code is ${data.demoOtp}`);
        setStep('otp');
      } else {
        setErrorMessage(data.error || 'Failed to send OTP.');
      }
    } catch (err) {
      // Fallback in case of network issue
      const demoCode = '849201';
      setGeneratedOtp(demoCode);
      setSimulatedSms(`Demo SMS for ${selectedCountry.code}${phoneNumber}: Code is ${demoCode}`);
      setStep('otp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!enteredOtp.trim()) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone: phoneNumber,
          country: selectedCountry,
          gender,
          role,
          otp: enteredOtp,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore confetti error if any
        }
        onSuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.error || 'OTP verification failed.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const autoFillOtp = () => {
    if (generatedOtp) {
      setEnteredOtp(generatedOtp);
    } else {
      setEnteredOtp('123456');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0d121c] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/40">
          <div>
            <h2 className="text-lg font-semibold text-white font-display">
              {step === 'details' ? 'Join OZY Client & Partner Portal' : 'Verify Phone Demo OTP'}
            </h2>
            <p className="text-xs text-slate-400">
              {step === 'details'
                ? 'Sign up with phone, country flag & gender for direct database sync'
                : `Enter the 6-digit code sent to ${selectedCountry.code} ${phoneNumber}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Owais Raza / Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* Country Selection with Flag & Phone */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Country Flag & Phone Number
                </label>
                <div className="flex gap-2">
                  {/* Country Flag Selector */}
                  <div className="relative w-44 shrink-0">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const found = COUNTRIES.find((c) => c.code === e.target.value);
                        if (found) setSelectedCountry(found);
                      }}
                      className="w-full appearance-none px-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors pr-8 font-mono"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.name} value={country.code} className="bg-slate-900 text-white">
                          {country.flag} {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>

                  {/* Phone input */}
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      required
                      placeholder={selectedCountry.code === '+92' ? '0316 0256315' : '123 456 7890'}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-mono"
                    />
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Selected dial code: <span className="text-emerald-400 font-mono font-medium">{selectedCountry.flag} {selectedCountry.code}</span>
                </p>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Gender Selection
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('Male')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      gender === 'Male'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                        : 'bg-slate-900/70 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span>👨</span>
                    <span>Male</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('Female')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      gender === 'Female'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                        : 'bg-slate-900/70 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span>👩</span>
                    <span>Female</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('Other')}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      gender === 'Other'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                        : 'bg-slate-900/70 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span>🧑</span>
                    <span>Other</span>
                  </button>
                </div>
              </div>

              {/* Role / Interest */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  I am interested in
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Client (Need Website)">Building a Custom Full-Stack Website</option>
                  <option value="Bakery / Retail Owner">Gojaba Bakery / E-Commerce Online Store</option>
                  <option value="Database Engineering">Database & Backend Architecture Integration</option>
                  <option value="Hire Full-Time / Contract">Hiring OZY Developer (1 Year Experience)</option>
                  <option value="General Collaborator">General Collaborator & Tech Discussion</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Generating Demo OTP...</span>
                ) : (
                  <>
                    <span>Generate & Send Demo Phone OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-5">
              {/* Simulated SMS Notification Card */}
              {simulatedSms && (
                <div className="p-3.5 bg-emerald-950/50 border border-emerald-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Simulated SMS Dispatch
                    </span>
                    <span className="text-[11px] text-emerald-300/80 font-mono">Live Demo</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono bg-slate-950/60 p-2.5 rounded-lg border border-emerald-900/50">
                    {simulatedSms}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">Code is ready</span>
                    <button
                      type="button"
                      onClick={autoFillOtp}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      Click to Auto-Fill Code ({generatedOtp || '123456'})
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="e.g. 123456"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-widest text-2xl font-mono px-3 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <p className="mt-1 text-center text-xs text-slate-400">
                  Demo hint: Use the auto-generated code above, or enter <code className="text-emerald-400 font-mono">123456</code>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Verifying with Database...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP & Save to Database</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  ← Edit Phone Number or Gender
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
