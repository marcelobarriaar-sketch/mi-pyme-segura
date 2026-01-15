
import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Target, 
  Rocket, 
  ShieldCheck, 
  Sun, 
  Wifi, 
  Eye, 
  Cpu, 
  ChevronRight,
  Mountain
} from 'lucide-react';

const valueIcons: Record<string, any> = {
  Sun, Wifi, Cpu, Eye
};

const CommitmentCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-[#cc0000]/30 transition-all">
    <div className="flex items-start gap-4">
      <div className="mt-1 bg-[#cc0000]/20 p-2 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-[#cc0000]" />
      </div>
      <div>
        <h4 className="text-white font-black uppercase text-sm mb-2 tracking-tight">{title}</h4>
        <p className="text-slate-400 text-xs font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

export default function About() {
  const { aboutValues } = useData();

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617]">
      {/* Hero Section - Origen y Trayectoria */}
      <section className="relative py-40 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518005020480-1097cbb4bb09?auto=format&fit=crop&q=80&w=2400" 
            alt="Sur de Chile Paisaje" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Sobre Mi Pyme Segura</span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 italic">
              PROTEGER LO QUE <br/>
              <span className="text-[#cc0000]">MÁS IMPORTA</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-8">
              En Mi Pyme Segura llevamos más de una década dedicados a un propósito claro. Nacimos desde la realidad que nos rodea —la inseguridad que afecta a miles de familias y negocios— y desde el sur de Chile levantamos una propuesta seria, moderna y al alcance de todos.
            </p>
          </div>
        </div>
      </section>

      {/* Identidad y Diferencial Rural */}
      <section className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[#cc0000]/10 text-[#cc0000] text-[10px] font-black uppercase tracking-[0.3em] border border-[#cc0000]/20">
                <Mountain className="w-4 h-4" /> Despliegue en Territorio
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none italic">
                Llegamos donde <br/> <span className="text-[#cc0000]">otros no llegan</span>
              </h2>
              <div className="space-y-6 text-slate-400 font-medium text-lg leading-relaxed">
                <p>
                  Somos un equipo joven, comprometido y siempre a la vanguardia tecnológica. Integramos sistemas de seguridad con inteligencia artificial, analizamos información en tiempo real y entregamos soluciones pensadas para el mundo actual.
                </p>
                <p className="bg-white/5 p-8 rounded-3xl border-l-4 border-[#cc0000] italic">
                  "No trabajamos solo en ciudad. Llegamos a sectores rurales y apartados, instalando cámaras con energías renovables, enlaces inalámbricos y sistemas autónomos que aseguran continuidad incluso en condiciones difíciles."
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutValues.map((val, idx) => {
                const IconComp = valueIcons[val.iconName] || Cpu;
                return (
                  <div key={val.id} className={`bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-amber-400/30 transition-all group h-full ${idx % 2 === 1 && idx === 1 ? 'mt-0' : idx % 2 === 1 ? 'mt-12' : ''}`}>
                    <IconComp className="w-10 h-10 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white font-black uppercase tracking-tight mb-2">{val.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-40 bg-white/2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-[#020617] p-16 rounded-[3rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-40 h-40 text-[#cc0000]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#cc0000] p-4 rounded-2xl shadow-lg shadow-red-900/40 text-white">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Nuestra Misión</h3>
                </div>
                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                  Proteger a personas, hogares y organizaciones mediante soluciones de seguridad inteligentes, integrando tecnología de vanguardia e inteligencia artificial.
                </p>
              </div>
            </div>
            
            <div className="bg-[#020617] p-16 rounded-[3rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Rocket className="w-40 h-40 text-[#cc0000]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#cc0000] p-4 rounded-2xl shadow-lg shadow-red-900/40 text-white">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Nuestra Visión</h3>
                </div>
                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                  Ser referentes en el sur de Chile en soluciones de seguridad inteligentes, destacando por nuestra innovación y uso de energías renovables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
