import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { History, ExternalLink, Play } from 'lucide-react';

const EquipmentCard: React.FC<{ 
  title: string, category: string, image: string, description: string, specs: string[],
  technicalSheetUrl?: string, videoUrl?: string, updates?: string
}> = ({ title, category, image, description, specs, technicalSheetUrl, videoUrl, updates }) => (
  <div className="group relative bg-white/5 rounded-[2.5rem] border border-white/5 shadow-xl overflow-hidden hover:border-amber-400/30 transition-all duration-500 flex flex-col">
    <div className="relative h-64 overflow-hidden bg-white/5">
      <img src={image} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
      <div className="absolute top-6 left-6 bg-amber-400 text-[#020617] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-400/10">
        {category}
      </div>
    </div>
    <div className="p-10 flex-grow flex flex-col">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4 group-hover:text-amber-400 transition-colors">{title}</h3>
      {updates && (
        <div className="mb-6 flex items-start gap-2 bg-amber-400/10 p-3 rounded-xl border border-amber-400/20">
          <History className="w-3 h-3 text-amber-400 mt-0.5" />
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 leading-tight">LOG_ENTRY: {updates}</span>
        </div>
      )}
      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-grow">{description}</p>
      <div className="space-y-3 mb-8">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            {spec}
          </div>
        ))}
      </div>
      <button 
        onClick={() => { if(technicalSheetUrl) window.open(technicalSheetUrl, '_blank') }}
        className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-amber-400 hover:text-[#020617] border border-white/10"
      >
        {technicalSheetUrl ? <>Ficha Técnica <ExternalLink className="w-3 h-3" /></> : 'Reservar Datos'}
      </button>
    </div>
  </div>
);

export default function Teams() {
  const { equipment } = useData();
  return (
    <div className="animate-in fade-in duration-700 bg-[#020617] py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Hardware de Vanguardia</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic">NUESTRO <span className="text-[#cc0000]">ARSENAL</span> TÉCNICO</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {equipment.map((item) => (<EquipmentCard key={item.id} {...item} />))}
        </div>
      </div>
    </div>
  );
}