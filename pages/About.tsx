
import React from 'react';
import { 
  Target, 
  Rocket, 
  ShieldCheck, 
  Sun, 
  Wifi, 
  Eye, 
  Cpu, 
  MessageSquare,
  ChevronRight,
  Mountain
} from 'lucide-react';

const ServiceItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 group">
    <div className="w-2 h-2 rounded-full bg-[#cc0000] group-hover:scale-150 transition-transform"></div>
    <span className="text-slate-300 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">{text}</span>
  </div>
);

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
            <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Sobre Mi Pyme Segura</span>
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
                <p>
                  Ese es nuestro sello: adaptarnos al cliente, al territorio y a la necesidad real.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-[#cc0000]/30 transition-all group h-full">
                  <Sun className="w-10 h-10 text-[#cc0000] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-black uppercase tracking-tight mb-2">Energía Solar</h3>
                  <p className="text-slate-500 text-sm">Sistemas autónomos para zonas sin red eléctrica.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-[#cc0000]/30 transition-all group h-full">
                  <Wifi className="w-10 h-10 text-[#cc0000] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-black uppercase tracking-tight mb-2">Enlaces de Larga Distancia</h3>
                  <p className="text-slate-500 text-sm">Conectividad robusta en terrenos complejos.</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-[#cc0000]/30 transition-all group h-full">
                  <Cpu className="w-10 h-10 text-[#cc0000] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-black uppercase tracking-tight mb-2">IA Táctica</h3>
                  <p className="text-slate-500 text-sm">Análisis inteligente para prevención real.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-[#cc0000]/30 transition-all group h-full">
                  <Eye className="w-10 h-10 text-[#cc0000] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-black uppercase tracking-tight mb-2">Monitoreo 24/7</h3>
                  <p className="text-slate-500 text-sm">Visualización remota desde cualquier lugar.</p>
                </div>
              </div>
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
                  Proteger a personas, hogares y organizaciones mediante soluciones de seguridad inteligentes, integrando tecnología de vanguardia e inteligencia artificial, adaptadas a cada contexto y necesidad, contribuyendo a generar entornos más seguros, confiables y sostenibles en el sur de Chile y sectores rurales del país.
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
                  Ser referentes en el sur de Chile en soluciones de seguridad inteligentes, destacando por nuestra innovación, uso de energías renovables, capacidad de operación en zonas apartadas y un servicio cercano que permita a las comunidades vivir y trabajar con mayor tranquilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/3">
              <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Nuestro Pacto</span>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none italic mb-8">Nuestro <br/>Compromiso <br/><span className="text-[#cc0000]">Contigo</span></h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                Seguridad real, tecnología de punta y una atención que entiende tu contexto. Eso es Mi Pyme Segura.
              </p>
            </div>
            
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <CommitmentCard 
                title="Te escuchamos primero" 
                desc="Antes de ofrecerte cualquier equipo, analizamos tu realidad y riesgos específicos." 
              />
              <CommitmentCard 
                title="Diseño de Precisión" 
                desc="Creamos la solución técnica exacta para tu caso, evitando gastos innecesarios." 
              />
              <CommitmentCard 
                title="Sin letra chica" 
                desc="Te explicamos todo en lenguaje simple para que tengas el control total de tu sistema." 
              />
              <CommitmentCard 
                title="Acompañamiento Total" 
                desc="Estamos contigo antes, durante y después de la instalación. Nunca te dejamos solo." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#cc0000] py-32 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-10">¿Listo para blindar tu inversión?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-[#cc0000] px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl">
              Agendar Auditoría Técnica <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
