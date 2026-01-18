import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.tsx';
import { Eye, Bell, ArrowRight, ShieldCheck, Lock, Globe, Target, Crosshair, Zap, Terminal } from 'lucide-react';

const TrackingBox = ({ top, left, label, delay = "0s", color = "yellow" }: { top: string, left: string, label: string, delay?: string, color?: "red" | "yellow" }) => {
  const colorClass = color === "red" ? "border-[#cc0000]" : "border-amber-400/60";
  const textClass = color === "red" ? "text-[#cc0000]" : "text-amber-400/80";
  const bgClass = color === "red" ? "bg-[#cc0000]/5" : "bg-amber-400/5";
  const iconColor = color === "red" ? "text-[#cc0000]" : "text-amber-400";

  return (
    <div 
      className="absolute z-20 pointer-events-none animate-[tracking-move_12s_infinite_ease-in-out] hidden md:block"
      style={{ top, left, animationDelay: delay }}
    >
      <div className="relative">
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${colorClass}`}></div>
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${colorClass}`}></div>
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${colorClass}`}></div>
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${colorClass}`}></div>
        
        <div className={`w-32 h-32 border ${colorClass.replace('border-', 'border-').replace('60', '20')} flex flex-col justify-end p-2 ${bgClass} backdrop-blur-[1px]`}>
          <div className={`hud-mono text-[8px] ${textClass} font-bold uppercase tracking-tighter`}>
            <div className="flex justify-between items-center mb-1">
              <span>OBJ_ID: {Math.floor(Math.random() * 9000) + 1000}</span>
              <span className="animate-pulse">● {color === 'red' ? 'CRITICAL' : 'SCANNING'}</span>
            </div>
            <div className="flex justify-between">
              <span>{label}</span>
              <span>{color === 'red' ? 'ALARM' : '98.4%'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveLogs = () => {
  const [logs, setLogs] = useState<string[]>(["[SYS] Booting secure kernel...", "[AI] Monitoring active zones..."]);
  const logPool = [
    "[SCAN] Zone B-4: Clear",
    "[AI] Pattern analysis complete",
    "[SYS] Encrypting data stream...",
    "[NET] Connection: High Bandwidth",
    "[ALARM] Test signal: OK",
    "[AI] Intrusion prediction: Low",
    "[SCAN] Human detection active",
    "[SYS] Backup synced to cloud"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [logPool[Math.floor(Math.random() * logPool.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hud-mono text-[8px] text-emerald-500/60 uppercase p-4 space-y-1">
      {logs.map((log, i) => (
        <div key={i} className={i === 0 ? "text-emerald-400 animate-pulse" : ""}>{log}</div>
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-[#cc0000]/40 transition-all group relative overflow-hidden">
    <div className="bg-[#cc0000]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#cc0000] transition-all duration-300 relative z-10">
      <Icon className="w-8 h-8 text-[#cc0000] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tighter relative z-10 group-hover:text-amber-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium text-sm relative z-10">{description}</p>
  </div>
);

export default function Home() {
  const { settings } = useData();

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-30 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale brightness-50" 
              alt="Background"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <TrackingBox top="20%" left="15%" label="ENTRY_PORTAL_S1" delay="0s" color="yellow" />
          <TrackingBox top="75%" left="70%" label="OFFSITE_BACKUP" delay="-4s" color="yellow" />
          
          <div className="absolute left-10 bottom-24 hidden lg:block w-48 border-l border-white/10 bg-black/20 backdrop-blur-md rounded-r-xl overflow-hidden">
            <div className="bg-white/5 p-2 flex items-center gap-2 border-b border-white/10">
              <Terminal className="w-3 h-3 text-[#cc0000]" />
              <span className="text-[8px] font-black uppercase text-white">System Logs</span>
            </div>
            <LiveLogs />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-30 flex flex-col items-center text-center">
          <div className="animate-bounce mb-8">
             <div className="px-6 py-2 rounded-full bg-amber-400 text-[#020617] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-amber-400/20 border border-amber-500/30">
                <Zap className="w-3 h-3 fill-current text-[#020617]" /> Inteligencia Táctica Desplegada
             </div>
          </div>
          
          <h1 className="text-5xl md:text-[8rem] font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic drop-shadow-2xl heading-tactical">
            {settings.heroTitle.split(',').map((part, i) => (
              <React.Fragment key={i}>
                {i === 1 ? <span className="text-[#cc0000]">{part}</span> : part}
                {i === 0 && settings.heroTitle.includes(',') && <br/>}
              </React.Fragment>
            ))}
            {!settings.heroTitle.includes(',') && settings.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl font-medium leading-relaxed bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
            {settings.heroSubtitle}
          </p>
          
          <Link to="/crear-proyecto" className="group px-16 py-8 bg-[#cc0000] hover:bg-red-700 text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-[0_25px_60px_-10px_rgba(204,0,0,0.5)] flex items-center justify-center gap-4 transition-all hover:scale-105 border border-amber-400/20">
            INICIAR DISEÑO IA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-40 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Protección 360°</span>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic heading-tactical">ESCUDO <span className="text-[#cc0000]">TACTICO</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Eye} title="Visión IA" description="Identificación de patrones sospechosos mediante visión computacional avanzada." />
            <FeatureCard icon={Lock} title="Accesos" description="Gestión biométrica y QR para asegurar que solo quien tú decidas entre a tu negocio." />
            <FeatureCard icon={Bell} title="Alarmas" description="Sistemas de intrusión con sensores de doble tecnología para cero falsas alarmas." />
            <FeatureCard icon={Globe} title="Control" description="Acceso total desde tu smartphone en cualquier lugar del mundo con baja latencia." />
          </div>
        </div>
      </section>
    </div>
  );
}