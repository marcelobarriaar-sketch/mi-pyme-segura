
import React from 'react';
import { useData } from '../context/DataContext.tsx';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export default function Contact() {
  const { settings } = useData();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-16">
            <div>
              <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Enlace Operativo</span>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-10 italic">Canales <br/><span className="text-[#cc0000]">Tácticos</span></h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                Nuestros especialistas están disponibles para coordinar levantamientos técnicos en terreno.
              </p>
            </div>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="bg-white/5 p-6 rounded-[2rem] group-hover:bg-[#cc0000] transition-all border border-white/5">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-1">Oficina Central</h4>
                  <p className="text-2xl font-black italic text-white hover:text-[#cc0000] transition-colors tracking-tighter cursor-pointer">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="bg-white/5 p-6 rounded-[2rem] group-hover:bg-[#cc0000] transition-all border border-white/5">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-1">Línea Directa</h4>
                  <p className="text-2xl font-black italic text-white hover:text-[#cc0000] transition-colors tracking-tighter cursor-pointer">{settings.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="bg-white/5 p-6 rounded-[2rem] group-hover:bg-[#cc0000] transition-all border border-white/5">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-1">Email Central</h4>
                  <p className="text-2xl font-black italic text-white hover:text-[#cc0000] transition-colors tracking-tighter cursor-pointer">{settings.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-12 md:p-20 rounded-[3.5rem] border border-white/5 backdrop-blur-md self-start">
            {submitted ? (
              <div className="text-center py-20 animate-in zoom-in duration-500">
                <div className="bg-[#cc0000] w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Solicitud <br/>Recibida</h2>
                <button onClick={() => setSubmitted(false)} className="mt-12 text-[#cc0000] font-black uppercase tracking-widest text-[10px] hover:underline">Nueva Solicitud</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Ticket de <br/>Asesoría</h3>
                </div>
                <div className="space-y-8">
                  <input placeholder="Nombre Completo" required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-[#cc0000] outline-none font-bold text-white transition-all" />
                  <input type="email" placeholder="Email" required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-[#cc0000] outline-none font-bold text-white transition-all" />
                  <textarea rows={4} placeholder="Mensaje" required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-[#cc0000] outline-none font-bold text-white transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#cc0000] text-white p-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-3">
                  Transmitir Solicitud <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
