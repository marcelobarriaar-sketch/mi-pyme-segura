import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Settings as SettingsIcon } from 'lucide-react';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import ProjectBuilder from './pages/ProjectBuilder';
import Admin from './pages/Admin';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#cc0000] p-2 rounded-lg shadow-lg shadow-red-900/40">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">
            MI PYME <span className="text-[#cc0000]">SEGURA</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-[10px] font-black uppercase tracking-widest hover:text-[#cc0000] transition-colors">Inicio</Link>
          <Link to="/crear-proyecto" className="px-6 py-2 bg-[#cc0000] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">Diseña tu Escudo</Link>
          <Link to="/admin" className="p-2 text-slate-600 hover:text-white transition-colors"><SettingsIcon className="w-4 h-4" /></Link>
        </div>
        
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-[#020617] p-6 space-y-4 border-t border-white/5">
          <Link to="/" onClick={() => setIsOpen(false)} className="block font-black text-xs uppercase">Inicio</Link>
          <Link to="/crear-proyecto" onClick={() => setIsOpen(false)} className="block font-black text-xs uppercase text-[#cc0000]">Diseña tu Escudo</Link>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#020617]">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crear-proyecto" element={<ProjectBuilder />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <footer className="p-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
            &copy; 2024 MI PYME SEGURA | STATUS: SECURE
          </footer>
        </div>
      </Router>
    </DataProvider>
  );
}