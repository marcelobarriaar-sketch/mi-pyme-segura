
import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Cpu, 
  Zap, 
  Satellite,
  ArrowRight,
  History,
  ExternalLink,
  Play
} from 'lucide-react';

const EquipmentCard: React.FC<{ 
  title: string, 
  category: string, 
  image: string, 
  description: string, 
  specs: string[],
  technicalSheetUrl?: string,
  videoUrl?: string,
  updates?: string
}> = ({ 
  title, 
  category, 
  image, 
  description, 
  specs,
  technicalSheetUrl,
  videoUrl,
  updates
}) => (
  <div className="group relative bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-[#cc0000]/50 transition-all duration-500 flex flex-col">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-6 left-6 bg-[#cc0000] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-900/40">
        {category}
      </div>
    </div>
    
    <div className="p-10 flex-grow flex flex-col">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4 group-hover:text-[#cc0000] transition-colors">{title}</h3>
      
      {updates && (
        <div className="mb-6 flex items-start gap-2 bg-[#cc0000]/5 p-3 rounded-xl border border-[#cc0000]/20 animate-pulse">
          <History className="w-3 h-3 text-[#cc0000] mt-0.5" />
          <span className="text-[9px] font-black uppercase tracking-widest text-[#cc0000] leading-tight">
            ACTUALIZACIÓN: {updates}
          </span>
        </div>
      )}

      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <div className="space-y-3 mb-8">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-1 h-1 rounded-full bg-[#cc0000]"></div>
            {spec}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => { if(technicalSheetUrl) window.open(technicalSheetUrl, '_blank') }}
          disabled={!technicalSheetUrl}
          className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group/btn ${
            technicalSheetUrl 
            ? 'bg-white text-black hover:bg-[#cc0000] hover:text-white' 
            : 'bg-white/5 text-slate-700 cursor-not-allowed'
          }`}
        >
          {technicalSheetUrl ? (
            <>Ficha Técnica <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" /></>
          ) : (
            'Ficha No Disponible'
          )}
        </button>

        {videoUrl && (
          <button 
            onClick={() => window.open(videoUrl, '_blank')}
            className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 bg-[#cc0000]/10 text-[#cc0000] border border-[#cc0000]/20 hover:bg-[#cc0000] hover:text-white group/vid"
          >
            Ver Video Demostrativo <Play className="w-3 h-3 fill-current group-hover/vid:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function Teams() {
  const { equipment } = useData();

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617] py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Hardware de Vanguardia</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic">NUESTRO <span className="text-[#cc0000]">ARSENAL</span> TÉCNICO</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Catálogo dinámico gestionado directamente desde nuestro Centro de Mando operativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} {...item} />
          ))}
        </div>

        <section className="mt-40 bg-white/2 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Cpu className="w-96 h-96 text-[#cc0000]" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-8">Sistemas con <span className="text-[#cc0000]">Energía Autónoma</span></h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">
                Integramos equipos con paneles solares de alta eficiencia para zonas remotas del sur de Chile.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <Zap className="w-8 h-8 text-[#cc0000] mb-4" />
                    <span className="text-white font-black uppercase tracking-widest text-[10px]">Carga Solar IA</span>
                 </div>
                 <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <Satellite className="w-8 h-8 text-[#cc0000] mb-4" />
                    <span className="text-white font-black uppercase tracking-widest text-[10px]">Enlace Satelital</span>
                 </div>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200" 
              alt="Energía Solar Rural" 
              className="relative z-10 rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
