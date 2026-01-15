
import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { MapPin, Target, Building2, ShieldCheck, HeartPulse, GraduationCap, CheckCircle2 } from 'lucide-react';

const icons = {
  HeartPulse,
  Building2,
  GraduationCap,
  ShieldCheck,
  Target
};

export default function PastProjects() {
  const { projects } = useData();

  return (
    <div className="animate-in fade-in duration-700 py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-32">
          <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Operaciones Ejecutadas</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic">Casos de <span className="text-[#cc0000]">Éxito</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
            Contenido dinámico gestionado directamente desde el panel de control táctico.
          </p>
        </div>
        
        <div className="space-y-40">
          {projects.map((project, idx) => {
            const Icon = icons[project.iconType as keyof typeof icons] || ShieldCheck;
            return (
              <div key={project.id} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 group relative">
                  <div className="absolute -inset-2 bg-[#cc0000]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 aspect-video shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-8 left-8 bg-[#cc0000] px-6 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <Icon className="w-4 h-4" /> {project.type}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-widest text-[10px]">
                    <MapPin className="w-4 h-4 text-[#cc0000]" /> {project.location}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none italic">{project.title}</h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">{project.description}</p>
                  
                  <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-sm group/card">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                      <Target className="w-24 h-24 text-[#cc0000]" />
                    </div>
                    <div className="flex items-start gap-5 relative z-10">
                      <div className="bg-[#cc0000]/20 p-3 rounded-2xl">
                        <CheckCircle2 className="w-6 h-6 text-[#cc0000] flex-shrink-0" />
                      </div>
                      <div>
                        <h4 className="font-black text-white/40 uppercase tracking-widest text-[10px] mb-2">Métrica de Impacto Lograda</h4>
                        <p className="text-white font-bold text-xl leading-snug italic">"{project.result}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
