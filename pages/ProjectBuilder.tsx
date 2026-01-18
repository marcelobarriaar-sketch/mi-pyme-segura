import React from 'react';
import { 
  Building2, 
  Store, 
  Factory, 
  Home as HomeIcon, 
  Camera, 
  ShieldAlert,
  Sparkles,
  Loader2,
  CheckCircle,
  FileText,
  ShieldCheck,
  Mail,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Target
} from 'lucide-react';
import { generateSecurityProposal } from '../services/geminiService.ts';
import { ProjectConfig, SecurityRecommendation } from '../types.ts';
import { useData } from '../context/DataContext.tsx';

const steps = [
  { id: 1, title: 'Sector' },
  { id: 2, title: 'Dimensión' },
  { id: 3, title: 'Prioridad' },
  { id: 4, title: 'Zona' },
  { id: 5, title: 'Nivel' }
];

export default function ProjectBuilder() {
  const { settings } = useData();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [sendingEmail, setSendingEmail] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState<SecurityRecommendation | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  
  const [formData, setFormData] = React.useState<ProjectConfig>({
    businessType: '',
    size: '',
    priorities: [],
    budget: '',
    location: ''
  });

  const handlePriorityToggle = (priority: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const nextStep = () => {
    setError(null);
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };
  
  const prevStep = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSecurityProposal(formData);
      setRecommendation(result);
    } catch (err: any) {
      setError("Falla en el enlace neuronal de la IA. Reintenta.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendProposalEmail = () => {
    if (!recommendation) return;
    setSendingEmail(true);

    setTimeout(() => {
      const recipient = settings.contactRecipient || settings.email;
      const subject = encodeURIComponent(`[DOSSIER TÁCTICO] Diseño de Seguridad: ${formData.businessType} - ${formData.location}`);
      const body = encodeURIComponent(
        `REPORTE DE DISEÑO TÉCNICO - MI PYME SEGURA\n` +
        `===============================================\n\n` +
        `PERFIL: ${formData.businessType} | ${formData.location}\n\n` +
        `ANÁLISIS IA:\n${recommendation.summary}\n\n` +
        `ESTIMACIÓN: ${recommendation.estimatedTime}\n\n` +
        `===============================================`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setSendingEmail(false);
    }, 1000);
  };

  if (recommendation) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4 animate-in zoom-in duration-700">
        <div className="bg-[#020617] rounded-[2rem] border border-[#cc0000]/30 shadow-2xl relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-45 select-none pointer-events-none">
            <span className="text-[10rem] font-black uppercase tracking-[1em] text-white">CONFIDENTIAL</span>
          </div>

          <div className="bg-[#cc0000] p-12 text-white relative flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block text-white/80">PROPOSAL_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic heading-tactical">DISEÑO DE <span className="text-amber-400">BLINDAJE</span></h1>
              <p className="text-[10px] font-bold mt-2 uppercase tracking-[0.2em]">{formData.businessType} / {formData.location}</p>
            </div>
            <ShieldCheck className="w-16 h-16 text-white opacity-40" />
          </div>
          
          <div className="p-12 space-y-16 relative z-10">
            <section className="bg-white/5 p-8 rounded-2xl border-l-4 border-[#cc0000]">
              <h3 className="text-xs font-black text-amber-400 mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
                <Target className="w-4 h-4" /> Diagnóstico Táctico Gemini 3
              </h3>
              <p className="text-slate-300 font-medium italic leading-relaxed text-lg">"{recommendation.summary}"</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                  <Camera className="w-5 h-5 text-[#cc0000]" /> Configuración de Hardware
                </h3>
                <div className="space-y-3">
                  {recommendation.recommendedHardware.map((hw, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/2 border border-white/5 rounded-xl hover:border-[#cc0000]/50 transition-all">
                      <div className="w-10 h-10 bg-[#cc0000] flex items-center justify-center text-white font-black rounded-lg text-xs">{hw.quantity}</div>
                      <div>
                        <div className="font-black text-[10px] text-white uppercase">{hw.item}</div>
                        <div className="text-[9px] text-slate-500">{hw.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#cc0000]" /> Secuencia de Ejecución
                </h3>
                <div className="space-y-4">
                  {recommendation.implementationPlan.map((plan, i) => (
                    <div key={i} className="flex gap-4 items-start hud-mono text-[10px]">
                      <span className="text-[#cc0000] font-black">[{i + 1}]</span>
                      <span className="text-slate-400 font-bold uppercase">{plan}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status Operativo</div>
                <div className="text-2xl font-black text-emerald-500 italic uppercase">Listo para despliegue</div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setRecommendation(null)} className="px-8 py-4 border border-white/10 text-slate-500 rounded-xl font-black text-[10px] uppercase hover:text-white transition-all">Reset</button>
                <button onClick={handleSendProposalEmail} className="px-8 py-4 bg-[#cc0000] text-white rounded-xl font-black text-[10px] uppercase shadow-xl hover:bg-red-700 flex items-center gap-3">
                  <Mail className="w-4 h-4" /> Solicitar este Diseño
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#cc0000] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Security Project Configurator</span>
          <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic heading-tactical">NÚCLEO <span className="text-[#cc0000]">IA</span></h1>
        </div>

        {/* Stepper Simple */}
        <div className="mb-20 flex justify-center gap-4">
          {steps.map(s => (
            <div key={s.id} className={`w-8 h-1 rounded-full ${currentStep >= s.id ? 'bg-[#cc0000]' : 'bg-white/10'}`}></div>
          ))}
        </div>

        <div className="glass-panel rounded-[2.5rem] p-12 md:p-20 border border-white/5 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between">
          {loading ? (
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 mb-10">
                <Loader2 className="w-24 h-24 text-[#cc0000] animate-spin" />
                <div className="absolute inset-0 border-4 border-amber-400/20 rounded-full"></div>
              </div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-widest text-center animate-pulse">Sincronizando con Núcleo Gemini 3...</h2>
            </div>
          ) : (
            <>
              <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                {currentStep === 1 && (
                  <div className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase italic heading-tactical">01_RUBRO</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[{ id: 'store', l: 'Comercio', i: Store }, { id: 'office', l: 'Oficina', i: Building2 }, { id: 'ind', l: 'Industria', i: Factory }, { id: 'res', l: 'Residencial', i: HomeIcon }].map(item => (
                        <button key={item.id} onClick={() => setFormData({...formData, businessType: item.l})} className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${formData.businessType === item.l ? 'border-[#cc0000] bg-[#cc0000]/10 text-white' : 'border-white/5 text-slate-600 hover:border-white/20'}`}>
                          <item.i className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase">{item.l}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Simplified logic for brevity, matches original but with v2 styling */}
                {currentStep === 2 && (
                  <div className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase italic heading-tactical">02_SUPERFICIE</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Compacto', 'Intermedio', 'Masivo'].map(l => (
                        <button key={l} onClick={() => setFormData({...formData, size: l})} className={`p-10 rounded-2xl border-2 font-black uppercase tracking-widest text-xs ${formData.size === l ? 'border-[#cc0000] bg-[#cc0000]/10 text-white' : 'border-white/5 text-slate-600'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                   <div className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase italic heading-tactical">03_PRIORIDADES</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {['Activos', 'Personas', 'Disuasión', 'Control'].map(l => (
                        <button key={l} onClick={() => handlePriorityToggle(l)} className={`p-6 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest ${formData.priorities.includes(l) ? 'border-[#cc0000] bg-[#cc0000]/10 text-white' : 'border-white/5 text-slate-600'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase italic heading-tactical">04_UBICACIÓN</h2>
                    <input type="text" placeholder="COMUNA / CIUDAD" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-8 bg-white/5 border-2 border-white/5 rounded-2xl focus:border-[#cc0000] text-xl font-black uppercase outline-none text-white" />
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-10">
                    <h2 className="text-3xl font-black text-white uppercase italic heading-tactical">05_BLINDAJE</h2>
                    <div className="grid grid-cols-3 gap-4">
                      {['Esencial', 'Corporativo', 'Elite'].map(l => (
                        <button key={l} onClick={() => setFormData({...formData, budget: l})} className={`p-10 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] ${formData.budget === l ? 'border-[#cc0000] bg-[#cc0000]/10 text-white' : 'border-white/5 text-slate-600'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-16 mt-16 border-t border-white/5">
                <button onClick={prevStep} disabled={currentStep === 1} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 disabled:opacity-0 transition-all">Regresar</button>
                {currentStep < 5 ? (
                  <button onClick={nextStep} className="px-10 py-4 bg-[#cc0000] text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">Continuar <ChevronRight className="w-4 h-4" /></button>
                ) : (
                  <button onClick={handleSubmit} className="px-12 py-5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#cc0000] hover:text-white transition-all">
                    <Sparkles className="w-5 h-5 text-amber-500" /> Analizar con Gemini
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}