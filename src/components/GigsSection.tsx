import React, { useState } from 'react';
import { Check, Clock, RefreshCw, Zap, ShieldCheck, Star, ShoppingBag, Sparkles, Database, Layers } from 'lucide-react';

interface GigTier {
  name: string;
  price: string;
  deliveryTime: string;
  revisions: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface GigItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  rating: number;
  reviewsCount: number;
  tiers: {
    basic: GigTier;
    standard: GigTier;
    premium: GigTier;
  };
}

interface GigsSectionProps {
  onSelectGig?: (gigTitle: string, tierName: string) => void;
  onOpenOrderModal?: (gigTitle: string, tierName: string) => void;
  onOpenSecuritySettings?: () => void;
  requireOtpSetting?: boolean;
}

export const GigsSection: React.FC<GigsSectionProps> = ({
  onSelectGig,
  onOpenOrderModal,
  onOpenSecuritySettings,
  requireOtpSetting = true,
}) => {
  const [selectedTiers, setSelectedTiers] = useState<Record<string, 'basic' | 'standard' | 'premium'>>({
    'gig-1': 'standard',
    'gig-2': 'standard',
    'gig-3': 'standard',
  });

  const gigs: GigItem[] = [
    {
      id: 'gig-1',
      title: 'Full-Stack Web Development & Live Database Integration',
      subtitle: 'Complete modern website with Express backend, database connection, and responsive UI',
      category: 'Full-Stack Engineering',
      rating: 5.0,
      reviewsCount: 28,
      tiers: {
        basic: {
          name: 'Starter Setup',
          price: '$99',
          deliveryTime: '2 Days',
          revisions: '3 Revisions',
          description: 'Single-page high-speed responsive website with clean frontend, contact forms, and WhatsApp button.',
          features: [
            '1-3 Responsive Pages / Sections',
            'Mobile, Tablet & Desktop Optimized',
            'WhatsApp Direct Integration (03160256315)',
            'Clean Semantic HTML5 / CSS3 / JavaScript',
            'Fast Page Speed & Performance',
          ],
        },
        standard: {
          name: 'Full-Stack Database',
          price: '$249',
          deliveryTime: '4 Days',
          revisions: 'Unlimited',
          description: 'Multi-page full-stack web application with Node/Express backend, persistent database connection, and OTP auth.',
          popular: true,
          features: [
            'Up to 6 Dynamic Pages / Views',
            'Live Database Connection (PostgreSQL/Express)',
            'Demo Phone OTP & Gender Profile Sign-up',
            'Interactive Live DB Query Viewer',
            'REST API Endpoints & Form Persistence',
            'Source Code & Free Deployment Support',
          ],
        },
        premium: {
          name: 'Enterprise Custom',
          price: '$499',
          deliveryTime: '7 Days',
          revisions: 'Unlimited',
          description: 'Complete scalable digital platform with complex database schemas, admin dashboard, and high-performance APIs.',
          features: [
            'Full Custom Web Architecture',
            'Multi-table Relational Database Sync',
            'Custom Admin Management Console',
            'Interactive 3D Three.js Elements',
            'Real-Time Webhooks & WhatsApp Automation',
            '1 Month Dedicated Maintenance & Support',
          ],
        },
      },
    },
    {
      id: 'gig-2',
      title: 'Artisan E-Commerce Store & Order Engine (like Gojaba Bakery)',
      subtitle: 'Modern online ordering store with product catalog, cart computation, and direct database receipts',
      category: 'E-Commerce & Retail',
      rating: 4.9,
      reviewsCount: 34,
      tiers: {
        basic: {
          name: 'Storefront Launch',
          price: '$149',
          deliveryTime: '3 Days',
          revisions: '4 Revisions',
          description: 'Custom product catalog with high-resolution food/retail display and WhatsApp 1-click checkout.',
          features: [
            'Up to 15 Products with Categories',
            'Category Filters & Star Ratings',
            '1-Click WhatsApp Quick Order to 03160256315',
            'Clean Mobile Food Menu UI',
          ],
        },
        standard: {
          name: 'Gojaba Bakery Pro',
          price: '$299',
          deliveryTime: '5 Days',
          revisions: 'Unlimited',
          description: 'Full bakery/grocery web system modeled after the Gojaba Bakery demo with live cart and database order sync.',
          popular: true,
          features: [
            'Interactive Live Cart with Real-Time Subtotals',
            'Direct Backend Database Order Placement',
            'Cash on Delivery & Online Card Simulation',
            'Customer Order Status Tracking',
            'Admin Orders Dashboard with Real-Time Feed',
            'WhatsApp Order Notifications',
          ],
        },
        premium: {
          name: 'Multi-Branch Mart',
          price: '$599',
          deliveryTime: '8 Days',
          revisions: 'Unlimited',
          description: 'Full commercial e-commerce suite with multi-category inventory, stock alerts, and merchant portals.',
          features: [
            'Unlimited Products & Variations',
            'Inventory & Stock Real-Time Sync',
            'Customer Accounts & Order History',
            'Custom Invoicing & PDF Receipts',
            'Speed Optimization & SEO Structured Data',
          ],
        },
      },
    },
    {
      id: 'gig-3',
      title: 'Interactive 3D Web Experience & Three.js Studio',
      subtitle: 'Immersive WebGL 3D graphics, floating particle geometries, and spatial brand visuals',
      category: '3D Web & Creative UI',
      rating: 5.0,
      reviewsCount: 19,
      tiers: {
        basic: {
          name: '3D Hero Scene',
          price: '$129',
          deliveryTime: '3 Days',
          revisions: '3 Revisions',
          description: 'Interactive Three.js hero viewport with glowing wireframe geometry and mouse rotation.',
          features: [
            'Interactive 3D Geometric Model',
            'Mouse Follow & Orbital Tilting',
            'Wireframe / Solid Mesh Toggles',
            'Smooth 60fps Mobile Performance',
          ],
        },
        standard: {
          name: 'Full 3D Showcase',
          price: '$279',
          deliveryTime: '5 Days',
          revisions: 'Unlimited',
          description: 'Custom 3D spatial presentation with particle network, lighting choreography, and interactive data nodes.',
          popular: true,
          features: [
            'Multi-Layer 3D Orbiting Mesh & Data Nodes',
            'Custom Studio Directional Lighting & Fog',
            'Hardware-Accelerated WebGL Shaders',
            'Interactive Overlay HUD & Controls',
            'Responsive Canvas Resize Handler',
          ],
        },
        premium: {
          name: 'Spatial Product View',
          price: '$499',
          deliveryTime: '7 Days',
          revisions: 'Unlimited',
          description: '360° product inspector with exploded geometry, material switchers, and sound effects.',
          features: [
            'Interactive 360° Product Inspection',
            'Custom 3D Materials & Textures',
            'Integrated Database Connection',
            'Full Cross-Device & Mobile Optimization',
          ],
        },
      },
    },
  ];

  const handleSelectTier = (gigId: string, tier: 'basic' | 'standard' | 'premium') => {
    setSelectedTiers((prev) => ({ ...prev, [gigId]: tier }));
  };

  const getWhatsAppGigLink = (gig: GigItem, tierKey: 'basic' | 'standard' | 'premium') => {
    const tier = gig.tiers[tierKey];
    const message = `Hello OZY Developer! I am interested in hiring you for your Gig:\n\n• Gig: ${gig.title}\n• Package: ${tier.name} (${tier.price})\n• Delivery: ${tier.deliveryTime}\n\nI want to discuss project requirements and get started!`;
    return `https://wa.me/923160256315?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="gigs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      {/* Gig Header with Developer Picture Badge */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/30 via-slate-900/90 to-[#0b0f17] border border-red-900/30">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Developer Picture Badge */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full p-1 bg-gradient-to-tr from-red-600 via-amber-500 to-red-600 shadow-2xl shadow-red-950/80 group">
            <img
              src="/src/assets/images/ozy_developer_avatar_1791097145963.jpg"
              alt="OZY Full-Stack Web Developer Badge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            {/* Online Indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono">
              <span className="text-red-400 font-bold">1 Year Full Stack Developer</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">HTML5 · CSS3 · JavaScript · Node · React</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">Available for Hire</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Freelance Gigs & Development Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Hire me directly for professional web solutions. Select your package tier below or order instantly on WhatsApp with verified 1-year full-stack expertise.
            </p>
          </div>
        </div>

        {/* WhatsApp Quick Hire Button */}
        <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
          <a
            href="https://wa.me/923160256315?text=Hello%20OZY%20Developer,%20I%20am%20interested%20in%20hiring%20you%20for%20a%20development%20gig!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-colors whitespace-nowrap"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
            </svg>
            <span>Order Gig on WhatsApp: 03160256315</span>
          </a>
          <span className="text-[11px] font-mono text-slate-400">
            Average Response: Under 15 Minutes
          </span>
        </div>
      </div>

      {/* Unknown Customer Protection Setting Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/80 border border-emerald-900/40 rounded-xl mb-8 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-white font-medium">Order Verification Setting:</span>
          <span className="text-emerald-300 font-mono">
            {requireOtpSetting ? 'Phone Demo OTP Sign-Up Required for Unknown People' : 'Guest Orders Permitted'}
          </span>
        </div>
        {onOpenSecuritySettings && (
          <button
            type="button"
            onClick={onOpenSecuritySettings}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-mono text-[11px] transition-colors"
          >
            Configure Order Verification Settings →
          </button>
        )}
      </div>

      {/* Gigs List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {gigs.map((gig) => {
          const currentTierKey = selectedTiers[gig.id] || 'standard';
          const currentTier = gig.tiers[currentTierKey];

          return (
            <div
              key={gig.id}
              className="rounded-2xl bg-[#0b0f17] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div>
                {/* Gig Header */}
                <div className="p-6 border-b border-slate-800/80 bg-slate-900/40">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-emerald-400 font-mono text-[11px]">
                      {gig.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{gig.rating.toFixed(1)}</span>
                      <span className="text-slate-500">({gig.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display leading-snug">
                    {gig.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
                    {gig.subtitle}
                  </p>
                </div>

                {/* Package Tier Switcher (Tabs) */}
                <div className="p-4 bg-slate-950/60 border-b border-slate-800/80">
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                    {(['basic', 'standard', 'premium'] as const).map((tierKey) => (
                      <button
                        key={tierKey}
                        type="button"
                        onClick={() => handleSelectTier(gig.id, tierKey)}
                        className={`py-1.5 px-2 rounded-lg font-medium capitalize transition-all ${
                          currentTierKey === tierKey
                            ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tierKey}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Tier Pricing & Deliverables */}
                <div className="p-6 space-y-4">
                  <div className="flex items-baseline justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {currentTier.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {currentTier.deliveryTime} Delivery
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 text-sky-400" />
                          {currentTier.revisions}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-emerald-400">
                        {currentTier.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentTier.description}
                  </p>

                  {/* Included Features */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      What's Included:
                    </span>
                    <ul className="space-y-2">
                      {currentTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Order Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <a
                  href={getWhatsAppGigLink(gig, currentTierKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
                  </svg>
                  <span>Order on WhatsApp (03160256315)</span>
                </a>

                {onOpenOrderModal && (
                  <button
                    type="button"
                    onClick={() => onOpenOrderModal(gig.title, `${currentTier.name} (${currentTier.price})`)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors font-mono"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Order via Database (Phone OTP Protected)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
