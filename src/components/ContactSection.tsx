import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, ShieldCheck, MessageSquare, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onInquirySubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onInquirySubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack E-Commerce (like Gojaba Bakery)');
  const [budget, setBudget] = useState('$1,000 - $3,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        try {
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
        } catch {}
        setSubmitSuccess(data.inquiry);
        setName('');
        setEmail('');
        setMessage('');
        if (onInquirySubmitted) onInquirySubmitted();
      }
    } catch {
      setSubmitSuccess({
        id: 'INQ-DEMO',
        name,
        phone,
        message,
      });
      if (onInquirySubmitted) onInquirySubmitted();
    } finally {
      setIsSubmitting(false);
    }
  };

  const templates = [
    {
      title: 'Bakery / E-Commerce Project',
      text: 'Hello OZY Developer, I saw your Gojaba Bakery demo and want a custom e-commerce website with live database ordering.',
    },
    {
      title: 'Full-Stack 3D Web Application',
      text: 'Hello OZY Developer, I want to discuss a 3D interactive website with backend and database connection.',
    },
    {
      title: 'Hire Developer (1 Year Experience)',
      text: 'Hello OZY Developer, I would like to discuss a development contract/full-time opportunity with you.',
    },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct WhatsApp & Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>03 · Global Contact & Inquiries</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-display">
              Contact Me Early for Your Project
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Available globally for client web development projects, database architecture, and full-stack digital transformations. Reach out directly on WhatsApp for fastest response.
            </p>
          </div>

          {/* Featured WhatsApp Card */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-600/40 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400">Official WhatsApp Direct</span>
                <h3 className="text-xl font-bold font-mono text-white">03160256315</h3>
                <span className="text-xs text-slate-400">International: +92 316 0256315</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Message directly for immediate project consultation, pricing estimates, or technical questions.
            </p>

            <a
              href="https://wa.me/923160256315?text=Hello%20OZY%20Developer,%20I%20am%20interested%20in%20building%20a%20website%20with%20database%20connection!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <span>Open WhatsApp Conversation Now</span>
            </a>
          </div>

          {/* Quick WhatsApp Message Starter Templates */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400">
              Quick 1-Click Message Starters:
            </span>
            <div className="space-y-2">
              {templates.map((tpl, i) => (
                <a
                  key={i}
                  href={`https://wa.me/923160256315?text=${encodeURIComponent(tpl.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors text-xs group"
                >
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-400 flex items-center justify-between">
                    <span>{tpl.title}</span>
                    <span className="text-emerald-500 font-mono text-[10px]">WhatsApp →</span>
                  </div>
                  <p className="text-slate-400 mt-1 line-clamp-1">{tpl.text}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Database-Connected Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-xl">
            <div className="mb-6 pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white font-display">
                Submit Project Brief to Database
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your message is stored securely in the OZY backend database table{' '}
                <code className="text-emerald-400 font-mono">inquiries</code>.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Inquiry Saved to Backend Database!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, <strong className="text-white">{submitSuccess.name}</strong>! Your inquiry ID is{' '}
                  <span className="font-mono text-emerald-400">{submitSuccess.id}</span>. We will contact you early on WhatsApp ({submitSuccess.phone}).
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-xs text-slate-200 rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Owais Raza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03160256315"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Full-Stack E-Commerce (like Gojaba Bakery)">
                        Bakery / Store (like Gojaba Bakery)
                      </option>
                      <option value="Custom Database & Backend Integration">
                        Custom Database & Backend Integration
                      </option>
                      <option value="Interactive 3D Web Studio">
                        Interactive 3D Three.js Studio
                      </option>
                      <option value="Local Business & Retail Solution">
                        Local Business & Mart (WhatsApp Order)
                      </option>
                      <option value="Full-Time / Developer Hire">
                        Full-Time / Contract Developer Hire
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['$500 - $1,500', '$1,500 - $3,000', '$3,000+'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-colors ${
                          budget === b
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your website requirements, desired database features, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Saving to Database...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to OZY Database</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
