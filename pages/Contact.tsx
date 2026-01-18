import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import { Mail, Phone, MapPin, Zap, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { settings } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = `mailto:${settings.contactRecipient || settings.email}?subject=Lead&body=${formData.message}`;
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-16">
            <div>
              <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Enlace Operativo</span>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-10 italic">Canales <br/><span className="text-[#cc0000]">Tácticos</span></h1>
            </div>
            <div className="space-y-10">
              {[
                { icon: MapPin, label: "Oficina Central", val: settings.address },
                { icon: Phone, label: "Línea Directa", val: settings.phone },
                { icon: Mail, label: "Email Central", val: settings.email }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="bg-amber-400/10 p-6 rounded-[2rem] border border-amber-400/20 group-hover:bg-amber-400 transition-all">
                    <item.icon className="w-8 h-8 text-amber-400 group-hover:text-[#020617] transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-1">{item.label}</h4>
                    <p className="text-2xl font-black italic text-white group-hover:text-amber-400 transition-colors tracking-tighter">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 p-12 md:p-20 rounded-[3.5rem] border border-amber-400/20 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Ticket de <br/><span className="text-amber-400">Asesoría</span></h3>
              <div className="space-y-8">
                <input required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-amber-400 outline-none font-bold text-white transition-all" placeholder="Nombre Completo" />
                <input type="email" required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-amber-400 outline-none font-bold text-white transition-all" placeholder="Email de contacto" />
                <textarea rows={4} required className="w-full p-5 bg-white/5 rounded-2xl border-2 border-white/5 focus:border-amber-400 outline-none font-bold text-white transition-all resize-none" placeholder="Necesidades..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#cc0000] text-white p-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-400 hover:text-[#020617] transition-all shadow-lg flex items-center justify-center gap-3 border border-amber-400/20">
                <Zap className="w-4 h-4 fill-current" /> Sincronizar Soporte
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}