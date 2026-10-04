import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { ArrowRight, Database, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface HeroProps {
  onOpenSignUp: () => void;
  onOpenBakeryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSignUp, onOpenBakeryDemo }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-800/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Developer Avatar Badge & 1 Year Full Stack Status */}
            <div className="flex items-center gap-4 p-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-fit">
              <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-red-600 via-amber-500 to-red-600 shrink-0">
                <img
                  src="/src/assets/images/ozy_developer_avatar_1791097145963.jpg"
                  alt="OZY 1 Year Full Stack Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-white font-bold font-display">OZY Developer</span>
                  <span className="text-emerald-400 font-semibold">· 1 Year Full Stack</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="text-amber-400">HTML5</span>
                  <span>·</span>
                  <span className="text-sky-400">CSS3</span>
                  <span>·</span>
                  <span className="text-yellow-300">JS</span>
                  <span>·</span>
                  <span className="text-emerald-400">Node / DB</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1] text-balance">
              1 Year Full Stack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400">
                Developer & 3D Web
              </span>{' '}
              Engineering.
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              I am <strong className="text-white font-semibold">OZY</strong> — a professional web developer crafting interactive 3D spatial web experiences, scalable backend architectures, and database-connected business platforms like <strong className="text-amber-300 font-semibold">Gojaba Bakery</strong>.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 bg-slate-900/80 border border-emerald-900/50 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-emerald-400" viewBox="0 0 24 24">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Global Contact</div>
                  <div className="text-sm font-bold font-mono text-emerald-300">
                    +92 316 0256315 <span className="font-sans text-xs text-slate-400 font-normal">(03160256315)</span>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/923160256315?text=Hello%20OZY%20Developer,%20I%20am%20interested%20in%20building%20a%20website%20with%20database%20connection!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs whitespace-nowrap transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#gigs"
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-red-950/50 transition-colors"
              >
                <span>Hire Developer / View Gigs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenBakeryDemo}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-colors"
              >
                <span>Gojaba Bakery Demo</span>
              </button>

              <button
                type="button"
                onClick={onOpenSignUp}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-medium rounded-xl text-sm flex items-center gap-2 transition-colors"
              >
                <span>Sign Up (Demo OTP)</span>
              </button>
            </div>

            {/* Proof Points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold text-sm">1 Year</span>
                <span>Pro Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-bold text-sm">3 Demos</span>
                <span>Live Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-sm">&lt; 10ms</span>
                <span>Database Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Visualizer */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-[#0b0f17] border border-slate-800 p-2 shadow-2xl overflow-hidden">
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>OZY 3D Engine · Live WebGL Core</span>
              </div>

              <ThreeCanvas interactive={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
