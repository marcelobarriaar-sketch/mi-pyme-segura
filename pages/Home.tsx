import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* HUD Background Decorations */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#cc0000]/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] border border-[#cc0000]/10 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_80%)]"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-900/20 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-bounce">
          <Zap className="w-3 h-3 fill-current" /> Operativo en Región de Los Lagos
        </div>
        
        <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic heading-tactical mb-12">
          Blindaje <br/><span className="text-[#cc0000]">Inteligente</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
          Arquitectura de seguridad proactiva impulsada por IA. Diseñamos el sistema que tu esfuerzo merece proteger.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/crear-proyecto" className="group px-12 py-6 bg-[#cc0000] text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 transition-all hover:scale-105 shadow-[0_20px_50px_-10px_rgba(204,0,0,0.5)]">
            INICIAR DISEÑO IA <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <div className="px-12 py-6 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md">
            <Target className="w-5 h-5 text-red-500" /> +50 Sitios Asegurados
          </div>
        </div>
      </div>
    </div>
  );
}