
import React, { useState } from 'react';
import type { ViewType } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Clients from './components/Clients';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'customer':
        return <Clients onNavigate={setActiveView} />;
      default:
        return <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800">Fonctionnalité à venir</h1>
          <p className="text-slate-600">La section "{activeView}" est en cours de construction.</p>
        </div>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex font-sans text-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64 relative">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
