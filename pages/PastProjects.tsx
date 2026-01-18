import React from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Target, ShieldCheck, HeartPulse, GraduationCap, CheckCircle2 } from 'lucide-react';

const icons = { HeartPulse, GraduationCap, ShieldCheck, Target };

export default function PastProjects() {
  const { projects } = useData();
  return (
    <div className="animate-in fade-in duration-700 py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-32">
          <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Operaciones Ejecutadas</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">Casos de <span className="text-[#cc0000]">Éxito</span></h1>
        </div>
        <div className="space-y-40">
          {projects.map((project, idx) => {
            const Icon = (icons as any)[project.iconType] || ShieldCheck;
            return (
              <div key={project.id} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-[3rem] border border-white/5 aspect-video shadow-2xl mb-6">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-80" />
                    <div className="absolute top-8 left-8 bg-amber-400 text-[#020617] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Icon className="w-4 h-4" /> {project.type}
                    </div>
                  </div>
                  
                  {project.supportImages && project.supportImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {project.supportImages.filter(url => url.trim() !== '').map((url, sIdx) => (
                        <div key={sIdx} className="aspect-video rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all">
                          <img src={url} className="w-full h-full object-cover" alt="Support" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex items-center gap-3 text-amber-400 font-black uppercase tracking-widest text-[10px]">
                    <MapPin className="w-4 h-4" /> {project.location}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight italic">{project.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">{project.description}</p>
                  <div className="bg-white/5 border border-amber-400/20 p-8 rounded-[2rem] flex items-start gap-5">
                    <div className="bg-amber-400/20 p-3 rounded-2xl"><CheckCircle2 className="w-6 h-6 text-amber-400" /></div>
                    <div>
                      <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-1">Impacto</h4>
                      <p className="text-white font-bold text-xl italic text-amber-400">"{project.result}"</p>
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