import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#07090e] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-base font-bold text-white font-display">
            OZY Website Developer
          </span>
          <p className="mt-1 text-slate-400 max-w-sm">
            Professional Full-Stack Web Studio · 3D Spatial Experiences, Express Backends, and Live Database Architecture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">
            Experience (1 Year)
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Gojaba Bakery
          </a>
          <a href="#database-hub" className="hover:text-white transition-colors">
            Database Hub
          </a>
          <a
            href="https://wa.me/923160256315"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
          >
            WhatsApp: 03160256315
          </a>
        </div>

        <div className="text-slate-400 text-right sm:text-right">
          © {new Date().getFullYear()} OZY Developer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
