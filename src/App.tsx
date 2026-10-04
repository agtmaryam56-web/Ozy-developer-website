import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GigsSection } from './components/GigsSection';
import { ServicesAndSkills } from './components/ServicesAndSkills';
import { DatabaseLiveHub } from './components/DatabaseLiveHub';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SignUpOtpModal } from './components/SignUpOtpModal';
import { GojabaBakeryModal } from './components/GojabaBakeryModal';
import { LocalMartModal } from './components/LocalMartModal';
import { OrderSecuritySettingsModal } from './components/OrderSecuritySettingsModal';
import { WebsiteOrderModal } from './components/WebsiteOrderModal';
import { UserProfile } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isBakeryDemoOpen, setIsBakeryDemoOpen] = useState(false);
  const [isMartDemoOpen, setIsMartDemoOpen] = useState(false);
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState(false);
  const [requirePhoneOtpForOrders, setRequirePhoneOtpForOrders] = useState(true);

  // Custom Website / Gig Order state
  const [isWebsiteOrderOpen, setIsWebsiteOrderOpen] = useState(false);
  const [selectedGigOrder, setSelectedGigOrder] = useState<{ title: string; tier: string }>({
    title: 'Full-Stack Web Development & Live Database Integration',
    tier: 'Standard ($249)',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore user from localStorage if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ozy_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {}

    // Check order security setting from backend
    fetch('/api/settings/order-security')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings && typeof data.settings.requirePhoneOtpForUnknownOrders === 'boolean') {
          setRequirePhoneOtpForOrders(data.settings.requirePhoneOtpForUnknownOrders);
        }
      })
      .catch(() => {});
  }, []);

  const handleSignUpSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ozy_user', JSON.stringify(user));
    } catch {}

    setToastMessage(`Welcome ${user.fullName}! Phone OTP verified (${user.country.flag} ${user.gender}). You can now place verified orders!`);
    setTimeout(() => setToastMessage(null), 7000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ozy_user');
    } catch {}
    setToastMessage('Signed out successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOrderPlaced = () => {
    setToastMessage('Order verified with Phone OTP and written directly to the database!');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleInquirySubmitted = () => {
    setToastMessage('Project inquiry saved in database! Contacting you on WhatsApp soon.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleOpenGigOrder = (title: string, tier: string) => {
    setSelectedGigOrder({ title, tier });
    setIsWebsiteOrderOpen(true);
  };

  const scrollToDatabaseHub = () => {
    const el = document.getElementById('database-hub');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-950/95 border border-emerald-500/60 rounded-xl shadow-2xl text-xs text-emerald-200 animate-in slide-in-from-top-4 duration-200 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation with Order Policy trigger */}
      <Navbar
        currentUser={currentUser}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onLogout={handleLogout}
        onOpenDbHub={scrollToDatabaseHub}
        onOpenSecuritySettings={() => setIsSecuritySettingsOpen(true)}
        requireOtpSetting={requirePhoneOtpForOrders}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Split Hero with 3D Canvas */}
        <Hero
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenBakeryDemo={() => setIsBakeryDemoOpen(true)}
        />

        {/* Freelance Developer Gigs & Packages with Order Security Settings */}
        <GigsSection
          onOpenOrderModal={handleOpenGigOrder}
          onOpenSecuritySettings={() => setIsSecuritySettingsOpen(true)}
          requireOtpSetting={requirePhoneOtpForOrders}
        />

        {/* 1 Year Professional Experience & Backend Capabilities */}
        <ServicesAndSkills />

        {/* Real-Time Database Connection & Query Explorer */}
        <DatabaseLiveHub />

        {/* Projects Showcase (Gojaba Bakery + 2 Local Projects) */}
        <ProjectsShowcase
          onOpenBakeryDemo={() => setIsBakeryDemoOpen(true)}
          onOpenMartDemo={() => setIsMartDemoOpen(true)}
        />

        {/* Contact & WhatsApp Channel (03160256315) */}
        <ContactSection onInquirySubmitted={handleInquirySubmitted} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action (03160256315) */}
      <FloatingWhatsApp />

      {/* Sign Up / Phone OTP Modal */}
      <SignUpOtpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSuccess={handleSignUpSuccess}
      />

      {/* Gojaba Bakery Live Demo Web App with Unknown Customer OTP Protection */}
      <GojabaBakeryModal
        isOpen={isBakeryDemoOpen}
        onClose={() => setIsBakeryDemoOpen(false)}
        onOrderPlaced={handleOrderPlaced}
        currentUser={currentUser}
        onRequireSignUp={() => setIsSignUpOpen(true)}
        requireOtpSetting={requirePhoneOtpForOrders}
      />

      {/* Local Mart Live Demo Web App */}
      <LocalMartModal
        isOpen={isMartDemoOpen}
        onClose={() => setIsMartDemoOpen(false)}
      />

      {/* Website Order Security Settings Modal */}
      <OrderSecuritySettingsModal
        isOpen={isSecuritySettingsOpen}
        onClose={() => setIsSecuritySettingsOpen(false)}
        onSettingsChanged={(s) => setRequirePhoneOtpForOrders(s.requirePhoneOtpForUnknownOrders)}
      />

      {/* Direct Website / Gig Development Order Modal */}
      <WebsiteOrderModal
        isOpen={isWebsiteOrderOpen}
        onClose={() => setIsWebsiteOrderOpen(false)}
        currentUser={currentUser}
        onRequireSignUp={() => setIsSignUpOpen(true)}
        selectedGigTitle={selectedGigOrder.title}
        selectedTier={selectedGigOrder.tier}
        onOrderPlaced={handleOrderPlaced}
        requireOtpSetting={requirePhoneOtpForOrders}
      />
    </div>
  );
}
