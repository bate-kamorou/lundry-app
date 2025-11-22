
import React from 'react';
import type { ViewType } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  activeView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, activeView }) => {
  const getTitle = () => {
    const title = activeView.charAt(0).toUpperCase() + activeView.slice(1);
    switch (activeView) {
      case 'dashboard': return 'Tableau de bord';
      case 'orders': return 'Gestion des Commandes';
      default: return title;
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="lg:hidden text-slate-600 mr-4 hover:text-brand-green-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{getTitle()}</h1>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 hover:text-brand-green-600 transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center pl-6 border-l border-slate-200">
          <div className="text-right mr-3 hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Alex</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <img src="https://picsum.photos/id/237/40/40" alt="User Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-green-100" />
        </div>
      </div>
    </header>
  );
};

export default Header;
