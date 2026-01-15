
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bell, ArrowRight, ShieldCheck, Lock, Globe, Target, Crosshair, Zap } from 'lucide-react';

const TrackingBox = ({ top, left, label, delay = "0s" }: { top: string, left: string, label: string, delay?: string }) => (
  <div 
    className="absolute z-20 pointer-events-none animate-[tracking-move_12s_infinite_ease-in-out] hidden md:block"
    style={{ top, left, animationDelay: delay }}
  >
    <div className="relative">
      {/* Esquinas de la mira */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#cc0000]"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#cc0000]"></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#cc0000]"></div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#cc0000]"></div>
      
      {/* Contenedor del target */}
      <div className="w-32 h-32 border border-[#cc0000]/30 flex flex-col justify-end p-2 bg-[#cc0000]/5 backdrop-blur-[1px]">
        <div className="hud-mono text-[8px] text-[#cc0000] font-bold uppercase tracking-tighter">
          <div className="flex justify-between items-center mb-1">
            <span>OBJ_ID: {Math.floor(Math.random() * 9000) + 1000}</span>
            <span className="animate-pulse">● REC</span>
          </div>
          <div className="flex justify-between">
            <span>{label}</span>
            <span>98.4%</span>
          </div>
        </div>
      </div>
      
      {/* Mira central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
        <Crosshair className="w-6 h-6 text-[#cc0000]" />
      </div>
    </div>
  </div>
);

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
        
        {/* Background Image Layer (Simula cámara moviéndose) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=2400" 
            alt="Surveillance Feed" 
            className="w-full h-full object-cover opacity-20 bg-surveillance grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80"></div>
          <div className="absolute inset-0 bg-[#020617]/40 backdrop-sepia-[0.2]"></div>
        </div>

        {/* HUD Elements Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Scanline Vertical */}
          <div className="scanline"></div>
          
          {/* Grid de seguridad */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#cc0000 1px, transparent 1px), linear-gradient(90deg, #cc0000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

          {/* Indicadores de esquinas */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20"></div>
          <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/20"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20"></div>

          {/* Tracking Boxes (Miras Telescópicas) */}
          <TrackingBox top="20%" left="15%" label="SECTOR_CARGA" delay="0s" />
          <TrackingBox top="60%" left="75%" label="PERSON_DETECTED" delay="-4s" />
          <TrackingBox top="15%" left="65%" label="ENTRY_GATE_01" delay="-8s" />

          {/* Datos técnicos laterales */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 hud-mono text-[10px] text-[#cc0000]/60 hidden lg:flex">
            <div className="flex flex-col border-r-2 border-[#cc0000] pr-4 items-end">
              <span className="text-white">LAT: 33.4489° S</span>
              <span>LON: 70.6693° W</span>
              <span>ALT: 520m</span>
            </div>
            <div className="flex flex-col border-r-2 border-[#cc0000] pr-4 items-end">
              <span className="text-white">CAM_04_NORTH</span>
              <span>720p @ 60FPS</span>
              <span className="text-green-500 animate-pulse">LINK_STABLE</span>
            </div>
          </div>
        </div>

        {/* Content Layer */}
        <div className="max-w-7xl mx-auto px-4 relative z-30 flex flex-col items-center text-center">
          <div className="animate-bounce mb-8">
             <div className="px-4 py-1 rounded-full bg-[#cc0000] text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3 h-3 fill-current" /> En Vivo: Auditoría IA Activa
             </div>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic">
            TU NEGOCIO, <br />
            <span className="text-[#cc0000] drop-shadow-[0_0_30px_rgba(204,0,0,0.6)] animate-[flicker_4s_infinite]">BAJO LLAVE</span>
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

        {/* Overlay final de ruido digital */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </section>

      {/* Trust Bar Dark */}
      <section className="bg-[#020617] py-24 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-slate-600 font-black uppercase tracking-[0.5em] text-[10px]">Ecosistema Tecnológico</span>
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

      {/* Services Section Dark */}
      <section className="py-40 bg-[#020617] relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-40 left-10"><Target className="w-64 h-64 text-[#cc0000]" /></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Capacidad Operativa</span>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">Blindaje <span className="text-[#cc0000]">Total</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Eye} 
              title="Vigilancia IP 4K" 
              description="Sistemas de ultra alta definición con analítica de movimiento y visión térmica para protección total."
            />
            <FeatureCard 
              icon={Lock} 
              title="Control Biométrico" 
              description="Gestión inteligente de accesos mediante reconocimiento facial y dactilar de alta precisión."
            />
            <FeatureCard 
              icon={Bell} 
              title="Alerta Crítica" 
              description="Detección temprana de anomalías conectada a nuestra central de respuesta inmediata 24/7."
            />
            <FeatureCard 
              icon={Globe} 
              title="Gestión Cloud" 
              description="Controla la seguridad de todos tus locales desde una plataforma unificada en tiempo real."
            />
          </div>
        </div>
      </section>

      {/* Final Banner Dark */}
      <section className="bg-[#cc0000] py-40 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[100px] border-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border-[10px] border-white/10 rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-10 italic leading-none">Protegemos <br/>tu Legado</h2>
          <p className="text-xl md:text-3xl font-medium mb-16 max-w-3xl mx-auto opacity-90 leading-relaxed">Implementamos la ingeniería táctica que tu empresa necesita para operar sin miedos.</p>
          <Link to="/crear-proyecto" className="inline-block bg-white text-[#cc0000] px-16 py-8 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95">
            Configurar Mi Proyecto IA
          </Link>
        </div>
      </section>
    </div>
  );
}
