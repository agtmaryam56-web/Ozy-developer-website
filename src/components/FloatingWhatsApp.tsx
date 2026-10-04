import React, { useState } from 'react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block bg-slate-900/95 text-white text-xs py-1.5 px-3 rounded-xl border border-emerald-500/40 shadow-xl font-mono whitespace-nowrap animate-in fade-in duration-150">
          <span className="text-emerald-400 font-semibold">Direct WhatsApp:</span> 03160256315
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/923160256315?text=Hello%20OZY%20Developer,%20I%20am%20interested%20in%20building%20a%20website%20with%20database%20connection!"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#090b10]"
        aria-label="Chat on WhatsApp with OZY Developer (03160256315)"
      >
        <svg
          className="w-7 h-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
        </svg>
      </a>
    </div>
  );
};
