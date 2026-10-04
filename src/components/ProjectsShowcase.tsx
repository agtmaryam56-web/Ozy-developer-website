import React from 'react';
import { ExternalLink, Database, ShoppingBag, Store, Calendar, ArrowRight } from 'lucide-react';

interface ProjectsShowcaseProps {
  onOpenBakeryDemo: () => void;
  onOpenMartDemo: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onOpenBakeryDemo,
  onOpenMartDemo,
}) => {
  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>01 · Case Studies & Live Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Featured Full-Stack Web Projects
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Real production-grade applications engineered with interactive UI, real-time database architecture, and instant WhatsApp customer channels.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs text-slate-400">
          <span className="font-mono text-emerald-400">1 Year Professional Experience</span>
          <span aria-hidden="true">·</span>
          <span>100% Responsive</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-10">
        {/* Project 1: Gojaba Bakery (Oversized Primary Showcase) */}
        <div className="relative rounded-2xl bg-[#0b0f17] border border-amber-900/30 overflow-hidden shadow-2xl transition-all hover:border-amber-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Project Image & Media */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-slate-900 overflow-hidden group">
              <img
                src="/src/assets/images/project_gojaba_bakery_1791096728908.jpg"
                alt="Gojaba Bakery Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent lg:hidden" />

              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-amber-200 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-800/40">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">Primary Demo · Gojaba Bakery</span>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span>Full-Stack E-Commerce</span>
                  <span aria-hidden="true">·</span>
                  <span>Database Connected</span>
                  <span aria-hidden="true">·</span>
                  <span>Order Dispatch</span>
                </div>

                <h3 className="text-2xl font-bold text-white font-display mb-3">
                  Gojaba Bakery Web Application
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Complete modern web presence and interactive ordering engine for Gojaba Bakery. Features a live product catalog, category filters, real-time cart computations, and direct write transactions into the backend database.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Real-time database order synchronization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Instant checkout with Cash on Delivery or Card</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Mobile-first responsive pastry menu</span>
                  </div>
                </div>

                {/* Tech tags without pill styling */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-6">
                  <span>React</span>
                  <span>/</span>
                  <span>Node Express</span>
                  <span>/</span>
                  <span>PostgreSQL Storage</span>
                  <span>/</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBakeryDemo}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-950/50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Launch Live Bakery Demo</span>
                </button>

                <a
                  href="#database-hub"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs flex items-center gap-1.5 transition-colors font-mono"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspect DB Table</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Additional Local Website Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 2: Local Bazaar Mart */}
          <div className="rounded-2xl bg-[#0b0f17] border border-slate-800 hover:border-emerald-700/50 transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-56 bg-slate-900 overflow-hidden group">
                <img
                  src="/src/assets/images/project_local_mart_1791096744085.jpg"
                  alt="Local Bazaar Mart"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-emerald-200 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-800/40">
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Local Retail System</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>Local Business Mart</span>
                  <span aria-hidden="true">·</span>
                  <span>WhatsApp Integration</span>
                  <span aria-hidden="true">·</span>
                  <span>Inventory Control</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Local Bazaar Mart & Quick Grocery
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Community-focused grocery web portal with live stock indicators, quick category filtering, and 1-click WhatsApp order generation directly dispatched to merchant phone 03160256315.
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-4">
                  <span>React</span>
                  <span>/</span>
                  <span>WhatsApp Cloud API</span>
                  <span>/</span>
                  <span>Express Database</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <button
                type="button"
                onClick={onOpenMartDemo}
                className="w-full py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Launch Local Mart Demo (WhatsApp Direct)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Project 3: CloudCare Medical Clinic */}
          <div className="rounded-2xl bg-[#0b0f17] border border-slate-800 hover:border-sky-700/50 transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-56 bg-slate-900 overflow-hidden group">
                <img
                  src="/src/assets/images/project_clinic_portal_1791096758580.jpg"
                  alt="CloudCare Medical Clinic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-sky-200 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-800/40">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Healthcare Booking</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>Medical Clinic</span>
                  <span aria-hidden="true">·</span>
                  <span>Patient Slots</span>
                  <span aria-hidden="true">·</span>
                  <span>Database Booking</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2">
                  CloudCare Clinic & Doctor Appointments
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Local medical practice portal allowing patients to schedule specialist consultations, verify available clinic time slots, and sync appointments into an encrypted doctor database.
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-4">
                  <span>TypeScript</span>
                  <span>/</span>
                  <span>PostgreSQL</span>
                  <span>/</span>
                  <span>SMS Alerts</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <a
                href="#contact"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Request Custom Clinic / Business Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
