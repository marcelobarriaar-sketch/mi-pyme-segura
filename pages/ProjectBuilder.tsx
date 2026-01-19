import React, { useState } from 'react';
import { Loader2, ShieldCheck, Sparkles, MapPin, Camera, Zap } from 'lucide-react';
import { generateSecurityProposal } from '../services/geminiService';
import { ProjectConfig, SecurityRecommendation } from '../types';

export default function ProjectBuilder() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<SecurityRecommendation | null>(null);
  const [formData, setFormData] = useState<ProjectConfig>({
    businessType: 'Comercio',
    size: '100m2',
    priorities: ['CCTV'],
    budget: 'Estándar',
    location: ''
  });

  const handleRunAI = async () => {
    setLoading(true);
    try {
      const result = await generateSecurityProposal(formData);
      setRecommendation(result);
    } catch (e) {
      alert("Error en el núcleo de IA");
    } finally {
      setLoading(false);
    }
  };

  if (recommendation) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 animate-in zoom-in duration-500">
        <div className="glass-panel rounded-[3rem] border border-[#cc0000]/30 overflow-hidden shadow-2xl">
          <div className="bg-[#cc0000] p-10 text-white flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Reporte Táctico</h2>
              <p className="text-[10px] font-bold opacity-80 tracking-widest">ID: SEC-{Math.floor(Math.random()*9000)}</p>
            </div>
            <ShieldCheck className="w-12 h-12" />
          </div>
          
          <div className="p-10 space-y-12">
            <section className="bg-white/5 p-6 rounded-2xl border-l-4 border-[#cc0000]">
              <p className="text-slate-300 italic font-medium">"{recommendation.summary}"</p>
            </section>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-red-500" /> Arsenal Recomendado
                </h3>
                <div className="space-y-3">
                  {recommendation.recommendedHardware.map((hw, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="w-8 h-8 bg-[#cc0000] flex items-center justify-center rounded text-[10px] font-black">{hw.quantity}</div>
                      <div className="text-[10px] font-black uppercase text-white">{hw.item}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" /> Plan de Despliegue
                </h3>
                <div className="space-y-4">
                  {recommendation.implementationPlan.map((step, i) => (
                    <div key={i} className="flex gap-4 hud-mono text-[9px] uppercase font-bold text-slate-500">
                      <span className="text-red-500">[{i+1}]</span> {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setRecommendation(null)} className="w-full py-5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Nuevo Diseño
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Núcleo <span className="text-[#cc0000]">ALFA-1</span></h1>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Configurador de Seguridad con IA</p>
      </div>

      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ubicación del Sitio</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Ej: Puerto Varas, Sector Centro"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 outline-none focus:border-red-500 text-white font-bold"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {['Comercio', 'Residencial', 'Industrial', 'Bodega'].map(type => (
             <button 
               key={type}
               onClick={() => setFormData({...formData, businessType: type})}
               className={`p-4 rounded-xl border font-black uppercase text-[10px] tracking-widest transition-all ${formData.businessType === type ? 'bg-[#cc0000] border-red-500 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
             >
               {type}
             </button>
           ))}
        </div>

        <button 
          onClick={handleRunAI}
          disabled={loading || !formData.location}
          className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#cc0000] hover:text-white transition-all disabled:opacity-30"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-4 h-4" /> Generar Escudo Técnico</>}
        </button>
      </div>
    </div>
  );
}