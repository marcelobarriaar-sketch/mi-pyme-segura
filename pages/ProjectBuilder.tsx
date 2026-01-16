import React from 'react';
import { 
  Building2, 
  Store, 
  Factory, 
  Home as HomeIcon, 
  Target, 
  AlertTriangle, 
  Camera, 
  ShieldAlert,
  Sparkles,
  Loader2,
  CheckCircle,
  FileText,
  ShieldCheck,
  Mail,
  Zap,
  RefreshCw,
  AlertCircle,
  ChevronRight
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
      console.error("AI Project Generation Error:", err);
      setError("No pudimos procesar tu diseño. Verifica tu conexión o intenta con parámetros más simples.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendProposalEmail = () => {
    if (!recommendation) return;
    setSendingEmail(true);

    setTimeout(() => {
      const recipient = settings.contactRecipient || settings.email;
      const subject = encodeURIComponent(`[MI PYME SEGURA] Propuesta IA: ${formData.businessType} - ${formData.location}`);
      
      let hardwareList = recommendation.recommendedHardware.map(hw => `• [${hw.quantity}] ${hw.item}: ${hw.description}`).join('\n');
      let stepsList = recommendation.implementationPlan.map((p, i) => `${i+1}. ${p}`).join('\n');

      const body = encodeURIComponent(
        `REPORTE DE DISEÑO TÉCNICO - MI PYME SEGURA\n` +
        `===============================================\n\n` +
        `PERFIL DEL PROYECTO:\n` +
        `- RUBRO: ${formData.businessType}\n` +
        `- ZONA: ${formData.location}\n\n` +
        `ANÁLISIS ESTRATÉGICO:\n` +
        `${recommendation.summary}\n\n` +
        `EQUIPAMIENTO DISEÑADO:\n` +
        `${hardwareList}\n\n` +
        `PLAN DE ACCIÓN:\n` +
        `${stepsList}\n\n` +
        `PLAZO DE ENTREGA: ${recommendation.estimatedTime}\n\n` +
        `===============================================`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setSendingEmail(false);
    }, 1000);
  };

  if (recommendation) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4 animate-in zoom-in duration-700">
        <div className="bg-[#020617] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
          <div className="bg-[#cc0000] p-12 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-full bg-black/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-white/80 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Reporte de Inteligencia Mi Pyme Segura</span>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">Diseño <span className="text-amber-400">Finalizado</span></h1>
                <p className="text-white/70 font-medium mt-2 uppercase tracking-wide text-xs">{formData.businessType} | {formData.location}</p>
              </div>
              <ShieldCheck className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="p-12 space-y-16">
            <section>
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                <FileText className="w-6 h-6 text-[#cc0000]" /> Estrategia y Análisis de Riesgo
              </h3>
              <div className="text-slate-300 leading-relaxed text-lg bg-white/5 p-10 rounded-[2rem] border border-white/5 font-medium italic">
                {recommendation.summary}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <Camera className="w-6 h-6 text-[#cc0000]" /> Inventario Técnico
                </h3>
                <div className="space-y-4">
                  {recommendation.recommendedHardware.map((hw, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="bg-[#cc0000] text-white font-black w-12 h-12 flex items-center justify-center rounded-xl shadow-lg">
                        {hw.quantity}
                      </div>
                      <div>
                        <div className="font-black text-white uppercase text-sm">{hw.item}</div>
                        <div className="text-xs text-slate-500 font-medium">{hw.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <CheckCircle className="w-6 h-6 text-[#cc0000]" /> Hoja de Ruta Operativa
                </h3>
                <div className="space-y-6">
                  {recommendation.implementationPlan.map((plan, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-[#cc0000] text-white flex-shrink-0 flex items-center justify-center text-xs font-black italic">
                        0{i + 1}
                      </div>
                      <span className="text-slate-400 font-bold leading-tight">{plan}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Ventana de Instalación</p>
                <p className="text-3xl font-black text-white italic">{recommendation.estimatedTime}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { setRecommendation(null); setError(null); setCurrentStep(1); }}
                  className="px-8 py-5 border-2 border-white/10 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                >
                  Nuevo Proyecto
                </button>
                <button 
                  onClick={handleSendProposalEmail}
                  disabled={sendingEmail}
                  className="px-10 py-5 bg-[#cc0000] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl flex items-center gap-3"
                >
                  {sendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  Recibir Propuesta
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
          <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Asistente de Diseño Táctico</span>
          <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Constructor de <span className="text-[#cc0000]">Proyectos</span></h1>
        </div>

        {/* Stepper */}
        <div className="mb-24 flex justify-between items-center relative max-w-3xl mx-auto">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#cc0000] z-0 transition-all duration-1000"
            style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
          ></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 rotate-45 ${
                currentStep >= step.id ? 'bg-[#cc0000] text-white shadow-lg scale-110' : 'bg-[#0f172a] text-slate-600 border border-white/5'
              }`}>
                <div className="-rotate-45">{step.id}</div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest absolute -bottom-10 whitespace-nowrap ${currentStep >= step.id ? 'text-[#cc0000]' : 'text-slate-600'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-[2.5rem] p-12 sm:p-20 min-h-[500px] flex flex-col justify-between border border-white/5 backdrop-blur-md relative overflow-hidden">
          {loading ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20">
               <div className="w-24 h-24 bg-[#cc0000]/10 rounded-full flex items-center justify-center mb-8 relative">
                 <Loader2 className="w-12 h-12 text-[#cc0000] animate-spin" />
                 <div className="absolute inset-0 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin"></div>
               </div>
               <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 text-center">Consultando <br/><span className="text-[#cc0000]">Motor Gemini Pro</span></h2>
               <div className="space-y-2 text-center">
                <p className="text-slate-500 font-black uppercase tracking-widest text-[9px] animate-pulse">Analizando topografía del sector...</p>
                <p className="text-slate-600 font-black uppercase tracking-widest text-[8px]">Esto puede tardar hasta 30 segundos.</p>
               </div>
            </div>
          ) : error ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20">
               <div className="bg-red-900/10 p-10 rounded-[2.5rem] border border-red-500/20 text-center max-w-md">
                 <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                 <h2 className="text-2xl font-black text-white uppercase italic mb-4 tracking-tighter">Error Operativo</h2>
                 <p className="text-slate-400 font-medium mb-10 leading-relaxed text-sm">{error}</p>
                 <button onClick={handleSubmit} className="flex items-center gap-3 bg-[#cc0000] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] mx-auto hover:bg-red-700 transition-all shadow-lg">
                   <RefreshCw className="w-4 h-4" /> Reintentar Ahora
                 </button>
               </div>
            </div>
          ) : (
            <div className="relative z-10 animate-in fade-in slide-in-from-right-8 duration-500">
              {currentStep === 1 && (
                <div className="space-y-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Rubro del <br/>Proyecto</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { id: 'comercio', label: 'Comercio', icon: Store },
                      { id: 'oficina', label: 'Oficina', icon: Building2 },
                      { id: 'industria', label: 'Logística', icon: Factory },
                      { id: 'domicilio', label: 'Residencia', icon: HomeIcon }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setFormData({ ...formData, businessType: item.label })}
                        className={`p-10 rounded-3xl border-2 transition-all flex flex-col items-center gap-6 ${
                          formData.businessType === item.label 
                            ? 'border-[#cc0000] bg-[#cc0000]/10 text-[#cc0000]' 
                            : 'border-white/5 text-slate-500 bg-white/2 hover:border-white/20'
                        }`}
                      >
                        <item.icon className="w-10 h-10" />
                        <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Escala de <br/>Protección</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Compacto', 'Intermedio', 'Masivo'].map((label) => (
                      <button
                        key={label}
                        onClick={() => setFormData({ ...formData, size: label })}
                        className={`p-12 rounded-[2rem] border-2 transition-all text-center ${
                          formData.size === label 
                            ? 'border-[#cc0000] bg-[#cc0000]/10 shadow-xl' 
                            : 'border-white/5 bg-white/2 hover:border-white/20'
                        }`}
                      >
                        <div className="font-black text-2xl text-white uppercase tracking-tighter italic">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Prioridades <br/>Tácticas</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {['Activos', 'Personas', 'Disuasión', 'Analítica'].map((label) => (
                      <button
                        key={label}
                        onClick={() => handlePriorityToggle(label)}
                        className={`p-8 rounded-[2rem] border-2 transition-all flex items-center gap-6 ${
                          formData.priorities.includes(label) 
                            ? 'border-[#cc0000] bg-[#cc0000]/10' 
                            : 'border-white/5 bg-white/2 hover:border-white/20'
                        }`}
                      >
                        <ShieldAlert className={`w-7 h-7 ${formData.priorities.includes(label) ? 'text-[#cc0000]' : 'text-slate-600'}`} />
                        <span className="font-black text-white uppercase text-xs tracking-widest">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Zona Geográfica</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ej. Fresia, Puerto Montt, Stgo Centro..."
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-8 bg-white/5 border-2 border-white/5 rounded-[2rem] focus:border-[#cc0000] outline-none transition-all text-2xl font-black italic uppercase text-white placeholder:text-slate-800"
                    />
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest ml-4">
                      Esto permite a la IA analizar tasas de riesgo local.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Nivel de <br/>Blindaje</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {['Esencial', 'Corporativo', 'Elite'].map((label) => (
                      <button
                        key={label}
                        onClick={() => setFormData({ ...formData, budget: label })}
                        className={`p-12 rounded-[2rem] border-2 transition-all text-center ${
                          formData.budget === label 
                            ? 'border-[#cc0000] bg-[#cc0000]/10 shadow-xl' 
                            : 'border-white/5 bg-white/2 hover:border-white/20'
                        }`}
                      >
                        <div className="font-black text-2xl text-white uppercase tracking-tighter italic">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && (
            <div className="flex justify-between pt-16 mt-16 border-t border-white/5 relative z-10">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-10 py-4 font-black uppercase tracking-widest text-xs transition-all ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-white'
                }`}
              >
                Anterior
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !formData.businessType) ||
                    (currentStep === 2 && !formData.size) ||
                    (currentStep === 3 && formData.priorities.length === 0) ||
                    (currentStep === 4 && !formData.location)
                  }
                  className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#cc0000] hover:text-white transition-all shadow-xl flex items-center gap-2 disabled:opacity-20"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.budget}
                  className="px-12 py-5 bg-[#cc0000] text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-lg flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Diseñar Proyecto IA
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}