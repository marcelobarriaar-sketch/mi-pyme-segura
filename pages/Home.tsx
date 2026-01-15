
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bell, ArrowRight, ShieldCheck, Lock, Globe, Target, Crosshair, Zap } from 'lucide-react';

const TrackingBox = ({ top, left, label, delay = "0s", color = "red" }: { top: string, left: string, label: string, delay?: string, color?: "red" | "yellow" }) => {
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
        {/* Esquinas de la mira */}
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${colorClass}`}></div>
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${colorClass}`}></div>
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${colorClass}`}></div>
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${colorClass}`}></div>
        
        {/* Contenedor del target */}
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
        
        {/* Mira central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <Crosshair className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-[#cc0000]/50 transition-all group backdrop-blur-sm">
    <div className="bg-[#cc0000]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#cc0000] transition-all duration-300">
      <Icon className="w-8 h-8 text-[#cc0000] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tighter">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium text-sm">{description}</p>
  </div>
);

const brands = [
  { name: 'Hikvision', domain: 'hikvision.com' },
  { name: 'Dahua', domain: 'dahuasecurity.com' },
  { name: 'Ezviz', domain: 'ezviz.com' },
  { name: 'Inim', domain: 'inim.biz' },
  { name: 'Ruijie', domain: 'ruijienetworks.com' },
  { name: 'Ubiquiti', domain: 'ui.com' },
  { name: 'Bosch', domain: 'boschsecurity.com' },
  { name: 'Axis', domain: 'axis.com' },
  { name: 'Paradox', domain: 'paradox.com' },
];

export default function Home() {
  return (
    <div className="animate-in fade-in duration-700 bg-[#020617]">
      {/* Hero Section con Surveillance HUD */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=2400" 
            alt="Surveillance Feed" 
            className="w-full h-full object-cover opacity-20 bg-surveillance grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80"></div>
        </div>

        {/* HUD Elements Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="scanline"></div>
          
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#cc0000 1px, transparent 1px), linear-gradient(90deg, #cc0000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20"></div>

          {/* Mezcla de miras Rojas y Amarillas (delicadas) */}
          <TrackingBox top="20%" left="15%" label="SECTOR_CARGA" delay="0s" color="red" />
          <TrackingBox top="60%" left="75%" label="SYSTEM_SCAN" delay="-4s" color="yellow" />
          <TrackingBox top="15%" left="65%" label="ENTRY_GATE_01" delay="-8s" color="yellow" />
          <TrackingBox top="40%" left="30%" label="AI_MONITOR" delay="-2s" color="yellow" />

          {/* Datos técnicos laterales con toques amarillos */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 hud-mono text-[10px] hidden lg:flex">
            <div className="flex flex-col border-r-2 border-amber-400/40 pr-4 items-end">
              <span className="text-white">LAT: 33.4489° S</span>
              <span className="text-amber-400/60">LON: 70.6693° W</span>
              <span className="text-slate-500">ALT: 520m</span>
            </div>
            <div className="flex flex-col border-r-2 border-[#cc0000]/40 pr-4 items-end">
              <span className="text-white">CAM_04_NORTH</span>
              <span className="text-slate-500">720p @ 60FPS</span>
              <span className="text-amber-400 animate-pulse font-black uppercase">IA_ANALYSIS_OK</span>
            </div>
          </div>
        </div>

        {/* Content Layer */}
        <div className="max-w-7xl mx-auto px-4 relative z-30 flex flex-col items-center text-center">
          <div className="animate-bounce mb-8">
             <div className="px-4 py-1 rounded-full bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-400/20">
                <Zap className="w-3 h-3 fill-current" /> Auditoría IA en Tiempo Real
             </div>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic">
            TU NEGOCIO, <br />
            <span className="text-[#cc0000] drop-shadow-[0_0_30px_rgba(204,0,0,0.6)]">BAJO LLAVE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl font-medium leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            Arquitectura de seguridad proactiva. Diseñamos sistemas inteligentes con rastreo en tiempo real que blindan tu patrimonio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link to="/crear-proyecto" className="group w-full sm:w-auto px-14 py-7 bg-[#cc0000] hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_-10px_rgba(204,0,0,0.5)] flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95">
              Diseñar Mi Proyecto <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contacto" className="w-full sm:w-auto px-14 py-7 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 transition-all border border-white/10 backdrop-blur-md">
              Hablar con un Experto
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#020617] py-24 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-slate-600 font-black uppercase tracking-[0.5em] text-[10px]">Ecosistema Tecnológico <span className="text-amber-400">Certificado</span></span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-y-12 gap-x-20 opacity-30 grayscale invert hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default">
            {brands.map((brand) => (
              <img 
                key={brand.name} 
                src={`https://logo.clearbit.com/${brand.domain}`} 
                alt={brand.name} 
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 bg-[#020617] relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Capacidad Operativa</span>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">Blindaje <span className="text-[#cc0000]">Total</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Eye} title="Vigilancia IP 4K" description="Sistemas de ultra alta definición con analítica de movimiento y visión térmica para protección total." />
            <FeatureCard icon={Lock} title="Control Biométrico" description="Gestión inteligente de accesos mediante reconocimiento facial y dactilar de alta precisión." />
            <FeatureCard icon={Bell} title="Alerta Crítica" description="Detección temprana de anomalías conectada a nuestra central de respuesta inmediata 24/7." />
            <FeatureCard icon={Globe} title="Gestión Cloud" description="Controla la seguridad de todos tus locales desde una plataforma unificada en tiempo real." />
          </div>
        </div>
      </section>
    </div>
  );
}
