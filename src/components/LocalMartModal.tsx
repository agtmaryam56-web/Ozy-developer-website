import React, { useState } from 'react';
import { X, ShoppingCart, MessageSquare, Check, Tag } from 'lucide-react';

interface LocalMartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalMartModal: React.FC<LocalMartModalProps> = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Farm Fresh Organic Eggs (Dozen)',
    'Cold-Pressed Olive Oil 1L',
  ]);

  if (!isOpen) return null;

  const catalog = [
    { id: 'M-1', name: 'Farm Fresh Organic Eggs (Dozen)', price: 3.8, unit: '12 pcs', stock: 45 },
    { id: 'M-2', name: 'Cold-Pressed Olive Oil 1L', price: 12.5, unit: '1 Bottle', stock: 18 },
    { id: 'M-3', name: 'Raw Natural Honey 500g', price: 8.9, unit: 'Jar', stock: 24 },
    { id: 'M-4', name: 'Basmati Super Kernel Rice 5kg', price: 11.2, unit: 'Bag', stock: 30 },
    { id: 'M-5', name: 'Himalayan Pink Rock Salt 1kg', price: 2.5, unit: 'Pack', stock: 60 },
  ];

  const toggleItem = (name: string) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const whatsAppMessage = encodeURIComponent(
    `Hello Local Mart & OZY Developer! I want to order the following items from the Local Mart website:\n${selectedItems.map((i) => `• ${i}`).join('\n')}\nPlease confirm stock and delivery.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0c1017] border border-emerald-900/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg">
              🛒
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-display">
                  Local Bazaar Mart Demo Web App
                </h2>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  WhatsApp Direct Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Neighborhood Grocery & Retail Platform with instant WhatsApp ordering
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 h-36">
            <img
              src="/src/assets/images/project_local_mart_1791096744085.jpg"
              alt="Local Mart Grocery Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1017] via-[#0c1017]/70 to-transparent p-5 flex flex-col justify-center">
              <span className="text-xs font-mono text-emerald-400">Automated Retail Catalog</span>
              <h3 className="text-lg font-bold text-white font-display">
                Fast Neighborhood Delivery via Direct WhatsApp Channel
              </h3>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Select Demo Groceries for Instant Order:
            </h4>
            <div className="space-y-2">
              {catalog.map((item) => {
                const isSelected = selectedItems.includes(item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.name)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                          isSelected ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.unit} · {item.stock} in stock</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Target Phone:{' '}
              <span className="font-mono text-emerald-400 font-semibold">03160256315</span>
            </div>

            <a
              href={`https://wa.me/923160256315?text=${whatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.848.504 3.58 1.38 5.08L2 22l5.08-1.34c1.46.824 3.14 1.34 4.924 1.34 5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.82 14.16c-.24.68-1.2 1.32-1.98 1.48-.54.12-1.24.2-3.6-0.78-3.02-1.26-4.96-4.32-5.12-4.52-.14-.2-1.22-1.62-1.22-3.1 0-1.48.78-2.2 1.06-2.5.28-.3.6-.38.8-.38.2 0 .4 0 .58.02.18.02.44-.08.68.52.26.62.88 2.14.96 2.3.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.38.38-.16.74.22.36.98 1.62 2.1 2.62 1.44 1.28 2.66 1.68 3.02 1.86.36.18.58.16.8-.1.22-.26.94-1.1 1.2-1.48.26-.38.52-.32.88-.18.36.14 2.28 1.08 2.68 1.28.4.2.66.3.76.46.1.18.1 1.02-.14 1.7z" />
              </svg>
              <span>Send Quick Order to WhatsApp (03160256315)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
