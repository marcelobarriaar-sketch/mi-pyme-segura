
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X,
  MapPin,
  Mail,
  Phone,
  Settings as SettingsIcon,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { DataProvider, useData } from './context/DataContext.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Teams from './pages/Teams.tsx';
import PastProjects from './pages/PastProjects.tsx';
import ProjectBuilder from './pages/ProjectBuilder.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';

const MiPymeSeguraLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} bg-[#cc0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 p-1 relative overflow-hidden`}>
    <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 45 V32 C32 22 40 14 50 14 C60 14 68 22 68 32 V45" />
      <circle cx="50" cy="68" r="24" />
      <path d="M30 70 L70 58" strokeWidth="8" stroke="white" />
    </svg>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Equipos', path: '/equipos' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Diseña tu Proyecto', path: '/crear-proyecto', highlight: true },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="bg-[#020617]/80 backdrop-blur-2xl text-white sticky top-0 z-[150] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <MiPymeSeguraLogo className="w-11 h-11" />
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase whitespace-nowrap leading-none">
                <span className="text-[#cc0000]">MI PYME</span> <span className="text-white">SEGURA</span>
              </span>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> SYSTEM: SECURE
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  item.highlight 
                    ? 'bg-[#cc0000] hover:bg-red-700 text-white ml-2 shadow-lg shadow-red-900/20' 
                    : location.pathname === item.path ? 'text-[#cc0000]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/admin" className="p-2 text-slate-600 hover:text-[#cc0000] transition-colors ml-4">
               <SettingsIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl hover:bg-white/5 text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#020617] border-t border-white/5 shadow-2xl">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest ${
                  item.highlight ? 'bg-[#cc0000] text-white' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { settings } = useData();
  return (
    <footer className="bg-[#020617] text-slate-400 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#cc0000]/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <MiPymeSeguraLogo className="w-9 h-9" />
            <span className="font-black text-xl text-white tracking-tighter uppercase whitespace-nowrap">
              MI PYME <span className="text-[#cc0000]">SEGURA</span>
            </span>
          </Link>
          <p className="max-w-md text-slate-400 font-medium leading-relaxed">
            Instalamos confianza. Protegemos el esfuerzo de los emprendedores con tecnología de seguridad de estándar internacional y <span className="text-[#cc0000] italic">análisis inteligente</span>.
          </p>
        </div>
        <div>
          <h4 className="text-white font-black mb-8 text-[10px] uppercase tracking-[0.3em]">Enlaces</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li><Link to="/nosotros" className="hover:text-[#cc0000] transition-colors">Nosotros</Link></li>
            <li><Link to="/equipos" className="hover:text-[#cc0000] transition-colors">Equipos Tácticos</Link></li>
            <li><Link to="/proyectos" className="hover:text-[#cc0000] transition-colors">Casos de Éxito</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black mb-8 text-[10px] uppercase tracking-[0.3em]">Contacto Directo</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#cc0000]" /> {settings.address}</li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#cc0000]" /> {settings.phone}</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#cc0000]" /> {settings.email}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-[10px] font-black tracking-[0.4em] uppercase opacity-40 text-slate-500">
        &copy; {new Date().getFullYear()} MI PYME SEGURA. <span className="text-[#cc0000]">STATUS: SECURE_V2.0</span>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#020617] text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/equipos" element={<Teams />} />
              <Route path="/proyectos" element={<PastProjects />} />
              <Route path="/crear-proyecto" element={<ProjectBuilder />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}
