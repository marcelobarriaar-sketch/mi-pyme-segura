
import React from 'react';
import { 
  Camera, 
  Wifi, 
  ShieldAlert, 
  Lock, 
  Radio, 
  Cpu, 
  Zap, 
  Satellite,
  Maximize,
  ArrowRight
} from 'lucide-react';

/**
 * EquipmentCard component defined using React.FC to handle React-reserved props 
 * like 'key' correctly when mapping through equipmentList.
 */
const EquipmentCard: React.FC<{ 
  title: string, 
  category: string, 
  image: string, 
  description: string, 
  specs: string[] 
}> = ({ 
  title, 
  category, 
  image, 
  description, 
  specs 
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
      
      <button className="w-full py-4 bg-white/5 hover:bg-[#cc0000] text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group/btn">
        Ficha Técnica <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const equipmentList = [
  {
    category: "CCTV - Vídeo Inteligente",
    title: "Cámaras Fijas tipo Bala",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
    description: "Diseñadas para disuasión visual y monitoreo perimetral de largo alcance con visión nocturna infrarroja y ultra HD.",
    specs: ["Resolución 4K/8K", "Protección IP67", "Analítica de Intrusión"]
  },
  {
    category: "CCTV - Vídeo Inteligente",
    title: "Cámaras Domo Antivandálicas",
    image: "https://images.unsplash.com/photo-1549495755-908075630666?auto=format&fit=crop&q=80&w=800",
    description: "Sistemas discretos ideales para interiores o áreas de acceso público, resistentes a impactos y sabotaje.",
    specs: ["Lente Varifocal", "Resistencia IK10", "WDR Real 120dB"]
  },
  {
    category: "CCTV - Vídeo Inteligente",
    title: "Cámaras PTZ Speed Dome",
    image: "https://images.unsplash.com/photo-1618146740613-2d93e80f124c?auto=format&fit=crop&q=80&w=800",
    description: "Control total con giro de 360° y zoom óptico potente para cubrir grandes áreas con una sola unidad.",
    specs: ["Zoom Óptico 45X", "Seguimiento Humano IA", "Láser IR 200m"]
  },
  {
    category: "Conectividad Robusta",
    title: "Sistema Satelital Starlink",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    description: "Conexión de alta velocidad para sectores rurales y apartados del sur de Chile donde el cableado no llega.",
    specs: ["Baja Latencia", "Ancho de Banda Ilimitado", "Ideal para Zonas Extremas"]
  },
  {
    category: "Conectividad Robusta",
    title: "Antenas de Enlace Punto a Punto",
    image: "https://images.unsplash.com/photo-1512418490979-92798ced43a9?auto=format&fit=crop&q=80&w=800",
    description: "Puentes inalámbricos de alta potencia para llevar internet y vídeo a kilómetros de distancia sin cables.",
    specs: ["Frecuencia 5GHz/60GHz", "Alcance hasta 20km", "Gigabit Inalámbrico"]
  },
  {
    category: "Conectividad Robusta",
    title: "Routers Industriales con Chip 5G",
    image: "https://images.unsplash.com/photo-1601524345195-63c7dbe31041?auto=format&fit=crop&q=80&w=800",
    description: "Sistemas de respaldo y conectividad móvil robusta para asegurar que su seguridad nunca se desconecte.",
    specs: ["Doble SIM Fallover", "Carcasa Metálica", "Gestión Cloud"]
  },
  {
    category: "Control y Alerta",
    title: "Sistemas de Alarma Centralizada",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    description: "Sensores de movimiento, sísmicos y de rotura vinculados a una central de monitoreo profesional.",
    specs: ["Protocolo Encriptado", "App de Control Total", "Batería de Respaldo"]
  },
  {
    category: "Control y Alerta",
    title: "Terminales de Acceso Biométrico",
    image: "https://images.unsplash.com/photo-1593583845845-7d67edad6a8c?auto=format&fit=crop&q=80&w=800",
    description: "Gestión de entrada mediante reconocimiento facial o huella dactilar, integrando asistencia de personal.",
    specs: ["Precisión 99.9%", "Base de Datos Local", "Apertura por Móvil"]
  }
];

export default function Teams() {
  return (
    <div className="animate-in fade-in duration-700 bg-[#020617] py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Hardware de Vanguardia</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic">NUESTRO <span className="text-[#cc0000]">ARSENAL</span> TÉCNICO</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Seleccionamos y configuramos los mejores dispositivos del mercado internacional para crear una red de protección infranqueable en cualquier entorno.
          </p>
        </div>

        {/* Categorías y Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {equipmentList.map((equipment, idx) => (
            <EquipmentCard key={idx} {...equipment} />
          ))}
        </div>

        {/* Sección de Integración Especializada */}
        <section className="mt-40 bg-white/2 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Cpu className="w-96 h-96 text-[#cc0000]" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-8">Sistemas con <span className="text-[#cc0000]">Energía Autónoma</span></h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">
                Para sectores rurales y faenas críticas, integramos estos equipos con paneles solares de alta eficiencia y bancos de baterías de litio, permitiendo operación 24/7 sin dependencia de la red eléctrica nacional.
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
            <div className="relative group">
               <div className="absolute -inset-4 bg-[#cc0000]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <img 
                 src="https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200" 
                 alt="Energía Solar Rural" 
                 className="relative z-10 rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10"
               />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
