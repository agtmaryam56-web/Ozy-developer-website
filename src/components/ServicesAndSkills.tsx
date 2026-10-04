import React from 'react';
import { Database, Server, Smartphone, Globe, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const ServicesAndSkills: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Developer Picture Badge & Workspace */}
        <div className="lg:col-span-5 relative space-y-4">
          {/* Main Visual: Developer Lion & Red Triangle Badge */}
          <div className="relative rounded-2xl overflow-hidden border border-red-900/40 bg-[#0c1017] group shadow-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-36 h-36 shrink-0 rounded-full p-1 bg-gradient-to-tr from-red-600 via-amber-500 to-red-600 shadow-xl shadow-red-950/80">
              <img
                src="/src/assets/images/ozy_developer_avatar_1791097145963.jpg"
                alt="OZY 1 Year Full Stack Web Developer Badge"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                Full-Stack Web Developer
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                OZY Web Studio
              </h3>
              <p className="text-xs text-slate-300">
                1 Year professional production experience with HTML5, CSS3, JavaScript, React, Node.js, and databases.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">HTML5</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">CSS3</span>
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">JavaScript</span>
              </div>
            </div>
          </div>

          {/* Secondary Visual: Workspace */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-lg">
            <img
              src="/src/assets/images/hero_ozy_workspace_1791096707374.jpg"
              alt="OZY Developer Workspace Studio"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/60 to-transparent flex items-end p-4">
              <div className="flex items-center justify-between w-full text-xs font-mono">
                <span className="text-emerald-400 font-semibold">1 Year Proven Development Track</span>
                <span className="text-slate-400">Since 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Capabilities & Services */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>02 · Professional Expertise</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-display">
              1 Year Professional Experience in Modern Full-Stack Web Development
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Every website I build combines high-fidelity visual presentation, reliable database connections, and business-focused conversion flows like phone OTP sign-ups and instant WhatsApp inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Capability 1 */}
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Database className="w-4 h-4" />
                <h4 className="text-sm font-semibold text-white">Database & Backend Architecture</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Relational & document database schema design, live query interfaces, sub-10ms response latency, and secure RESTful endpoints using Express & Node.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span>PostgreSQL</span>
                <span>·</span>
                <span>Express</span>
                <span>·</span>
                <span>REST APIs</span>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Layers className="w-4 h-4" />
                <h4 className="text-sm font-semibold text-white">Interactive 3D Web & Three.js</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spatial WebGL scenes, interactive particle networks, product 3D viewports, and custom shader lighting without sacrificing page load performance.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span>Three.js</span>
                <span>·</span>
                <span>WebGL</span>
                <span>·</span>
                <span>Hardware Accelerated</span>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Smartphone className="w-4 h-4" />
                <h4 className="text-sm font-semibold text-white">Phone OTP & Identity Portals</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                SMS verification flows, multi-country dial code & flag selectors, gender demographic capture, and real-time database registration.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span>Phone OTP</span>
                <span>·</span>
                <span>Country Flags</span>
                <span>·</span>
                <span>Gender Badges</span>
              </div>
            </div>

            {/* Capability 4 */}
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Globe className="w-4 h-4" />
                <h4 className="text-sm font-semibold text-white">WhatsApp Business & Global Commerce</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct WhatsApp order dispatch (e.g. 03160256315), prefilled cart messages, e-commerce stores (Gojaba Bakery), and local market platforms.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span>WhatsApp API</span>
                <span>·</span>
                <span>Global Reach</span>
                <span>·</span>
                <span>Direct Lead Gen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
