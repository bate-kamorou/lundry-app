
import React from 'react';
import type { ViewType, NavItem } from '../types';

const BankIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
  </svg>
);
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);
const OrdersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const CustomerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663c.11-.23.217-.468.324-.708M15 19.128a9.38 9.38 0 002.625.372M4.5 4.5a3.75 3.75 0 00-7.5 0v3h7.5v-3zM21 4.5a3.75 3.75 0 00-7.5 0v3h7.5v-3zM8.625 15a3.75 3.75 0 017.5 0v3h-7.5v-3z" />
  </svg>
);
const SubscriptionsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h5.25m-5.25 0h5.25m-5.25 0h5.25M5.25 6.75h13.5" />
  </svg>
);
const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9v-1.875" />
  </svg>
);
const StaffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.95.54.057.955.54.955 1.092v.054c.264.083.518.198.756.342a1.125 1.125 0 01.446 1.486l-.22.381c-.13.226-.044.518.18.654.224.137.49.19.746.19.257 0 .522-.053.746-.19.224-.136.31-.428.18-.654l-.22-.382a1.125 1.125 0 01.446-1.486c.238-.144.492-.259.756-.342V4.434c0-.552.416-1.035.955-1.092.55-.057 1.02.408 1.11.95.09.542-.294 1.13-.833 1.341-.282.11-.53.253-.75.422a1.125 1.125 0 01-1.14.072l-.213-.122a1.125 1.125 0 00-1.29.289l-.158.275a1.125 1.125 0 01-.98.583h-.003a1.125 1.125 0 01-.98-.583l-.158-.275a1.125 1.125 0 00-1.29-.289l-.213.122a1.125 1.125 0 01-1.14-.072c-.22-.169-.468-.312-.75-.422C4.334 5.07 3.95 4.482 4.04 3.94zM12 6.75a2.25 2.25 0 012.25 2.25v.03a2.25 2.25 0 01-2.25 2.25h-.003a2.25 2.25 0 01-2.25-2.25V9A2.25 2.25 0 0112 6.75zM12 15a2.25 2.25 0 012.25 2.25v.03a2.25 2.25 0 01-2.25 2.25h-.003a2.25 2.25 0 01-2.25-2.25V17.25A2.25 2.25 0 0112 15z" />
  </svg>
);


const DryCleaningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: DashboardIcon },
  { id: 'orders', label: 'Commandes', icon: OrdersIcon },
  { id: 'customer', label: 'Client', icon: CustomerIcon },
  { id: 'subscriptions', label: 'Abonnements', icon: SubscriptionsIcon },

  { id: 'pickup', label: 'Collecte', icon: TruckIcon },
  { id: 'delivery', label: 'Livraison', icon: TruckIcon },


  { id: 'staff', label: 'Personnel', icon: StaffIcon },
  { id: 'settings', label: 'Paramètres', icon: SettingsIcon },
];

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200 shadow-2xl z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col`}>
        <div className="flex items-center justify-center h-20 border-b border-slate-100 bg-gradient-to-r from-brand-green-50 to-white shrink-0">
          <DryCleaningIcon className="h-8 w-8 text-brand-green-600 drop-shadow-sm" />
          <h1 className="ml-3 text-xl font-bold text-slate-800 tracking-tight">Gestion Blanchisserie</h1>
        </div>
        <nav className="mt-6 px-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeView === item.id
                    ? 'bg-gradient-to-r from-brand-green-600 to-brand-green-500 text-white shadow-lg shadow-brand-green-500/30'
                    : 'text-slate-600 hover:bg-brand-green-50 hover:text-brand-green-700'
                    }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 transition-transform group-hover:scale-110 ${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-green-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-brand-green-50 rounded-xl p-4 border border-brand-green-100">
            <p className="text-xs text-brand-green-800 font-semibold text-center">Version 1.0.0</p>
            <p className="text-[10px] text-brand-green-600 text-center mt-1">© 2025 Laundry App</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
