import React from 'react';
import { UserProfile } from '../types';
import { User, LogOut, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile | null;
  onOpenSignUp: () => void;
  onLogout: () => void;
  onOpenDbHub: () => void;
  onOpenSecuritySettings?: () => void;
  requireOtpSetting?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenSignUp,
  onLogout,
  onOpenDbHub,
  onOpenSecuritySettings,
  requireOtpSetting = true,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090b10]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with developer avatar */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white font-display hover:text-emerald-400 transition-colors whitespace-nowrap"
        >
          <img
            src="/src/assets/images/ozy_developer_avatar_1791097145963.jpg"
            alt="OZY"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full border border-red-500/80 object-cover shrink-0"
          />
          <span>OZY Website Developer</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-emerald-400 transition-colors">
            Experience
          </a>
          <a href="#gigs" className="text-amber-300 hover:text-amber-200 transition-colors">
            Gigs & Pricing
          </a>
          <a href="#database-hub" className="hover:text-emerald-400 transition-colors">
            Database
          </a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Order Security Policy Toggle */}
          {onOpenSecuritySettings && (
            <button
              type="button"
              onClick={onOpenSecuritySettings}
              title="Website Order Security Policy: Unknown Customers Phone OTP"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg transition-colors font-mono"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${requireOtpSetting ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>Order Policy: {requireOtpSetting ? 'OTP Active' : 'Guest'}</span>
            </button>
          )}

          {/* Quick WhatsApp Action with WhatsApp Icon */}
          <a
            href="https://wa.me/923160256315?text=Hello%20OZY%20Developer,%20I%20am%20interested%20in%20building%20a%20website%20with%20database%20connection!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-600/40 rounded-lg hover:bg-emerald-900/80 transition-colors whitespace-nowrap"
            title="Chat directly on WhatsApp: 03160256315"
          >
            {/* Real SVG WhatsApp Icon */}
            <svg
              className="w-4 h-4 fill-emerald-400"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
            </svg>
            <span className="font-mono">03160256315</span>
          </a>

          {/* User Sign Up / Profile button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenDbHub}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 border border-slate-700 rounded-lg hover:bg-slate-750 transition-colors whitespace-nowrap"
              >
                <span>{currentUser.country.flag}</span>
                <span className="truncate max-w-[100px]">{currentUser.fullName}</span>
                <span className="text-[10px] text-emerald-400 font-mono">DB Sync</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-850"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenSignUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 shadow-sm transition-colors whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign Up (Demo OTP)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
