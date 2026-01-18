import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Target, Rocket, Sun, Wifi, Eye, Cpu, Shield, Zap, Satellite, Activity, Mountain
} from 'lucide-react';

const valueIcons: Record<string, any> = {
  Sun, Wifi, Cpu, Eye, Shield, Zap, Satellite, Activity
};

export default function About() {
  const { aboutValues } = useData();

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617]">
      <section className="relative py-40 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1518005020480-1097cbb4bb09?auto=format&fit=crop&q=80&w=2400" className="w-full h-full object-cover opacity-10 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Sobre Mi Pyme Segura</span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 italic">PROTEGER LO QUE <br/><span className="text-[#cc0000]">MÁS IMPORTA</span></h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-8">Nacimos desde el sur de Chile para levantar una propuesta seria, moderna y al alcance de todos.</p>
          </div>
        </div>
      </section>

      <section className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] border border-amber-400/20">
                <Mountain className="w-4 h-4" /> Despliegue en Territorio
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none italic">Llegamos donde <br/> <span className="text-[#cc0000]">otros no llegan</span></h2>
              <p className="text-slate-400 font-medium text-lg">Integramos sistemas con inteligencia artificial para entregar soluciones del mundo actual.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutValues.map((val, idx) => {
                const IconComp = valueIcons[val.iconName] || Shield;
                return (
                  <div key={val.id} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-amber-400/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 group-hover:text-amber-400 transition-all">
                      <IconComp className="w-20 h-20" />
                    </div>
                    <div className="bg-[#cc0000]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-400 transition-all">
                      <IconComp className="w-8 h-8 text-[#cc0000] group-hover:text-[#020617] transition-colors" />
                    </div>
                    <h3 className="text-white font-black uppercase tracking-tight mb-2 group-hover:text-amber-400 transition-colors">{val.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}