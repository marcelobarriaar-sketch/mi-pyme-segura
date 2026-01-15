
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
  ShieldCheck
} from 'lucide-react';
import { generateSecurityProposal } from '../services/geminiService.ts';
import { ProjectConfig, SecurityRecommendation } from '../types.ts';

const steps = [
  { id: 1, title: 'Sector' },
  { id: 2, title: 'Dimensión' },
  { id: 3, title: 'Prioridad' },
  { id: 4, title: 'Zona' },
  { id: 5, title: 'Nivel' }
];

export default function ProjectBuilder() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState<SecurityRecommendation | null>(null);
  
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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await generateSecurityProposal(formData);
      setRecommendation(result);
    } catch (error) {
      console.error("Error generating proposal:", error);
      alert("Error en el motor de IA. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (recommendation) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4 animate-in zoom-in duration-700">
        <div className="bg-[#020617] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
          <div className="bg-[#cc0000] p-12 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-full bg-black/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-white/80 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Reporte de Inteligencia #MS-2024</span>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Propuesta de <span className="italic">Seguridad Elite</span></h1>
                <p className="text-white/70 font-medium mt-2 uppercase tracking-wide text-xs">Para: {formData.businessType} en {formData.location}</p>
              </div>
              <ShieldCheck className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="p-12 space-y-16">
            <section>
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                <FileText className="w-6 h-6 text-[#cc0000]" /> Evaluación de Escenario
              </h3>
              <div className="text-slate-300 leading-relaxed text-lg bg-white/5 p-10 rounded-[2rem] border border-white/5 font-medium italic">
                {recommendation.summary}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <Camera className="w-6 h-6 text-[#cc0000]" /> Inventario Técnico Elite
                </h3>
                <div className="space-y-4">
                  {recommendation.recommendedHardware.map((hw, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-[#cc0000]/50 transition-colors">
                      <div className="bg-[#cc0000] text-white font-black w-12 h-12 flex items-center justify-center rounded-xl shadow-lg shadow-red-900/40">
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
                <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">Ventana de ejecución</p>
                <p className="text-3xl font-black text-white italic">{recommendation.estimatedTime}</p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setRecommendation(null)}
                  className="px-10 py-5 border-2 border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all flex-1 sm:flex-none"
                >
                  Reiniciar
                </button>
                <button className="px-10 py-5 bg-[#cc0000] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-900/40 flex-1 sm:flex-none">
                  Agendar Visita
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
          <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Motor de Inteligencia Operativa</span>
          <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Diseñador de <span className="text-[#cc0000]">Seguridad</span></h1>
          <p className="text-xl text-slate-400 font-medium">Configure sus requerimientos para una auditoría preliminar automatizada.</p>
        </div>

        {/* Stepper Dark */}
        <div className="mb-24 flex justify-between items-center relative max-w-3xl mx-auto">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#cc0000] z-0 transition-all duration-1000 shadow-[0_0_20px_rgba(204,0,0,0.6)]"
            style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
          ></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 rotate-45 ${
                currentStep >= step.id ? 'bg-[#cc0000] text-white shadow-lg shadow-red-900/40 scale-110' : 'bg-[#0f172a] text-slate-600 border border-white/5'
              }`}>
                <div className="-rotate-45">{step.id}</div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest absolute -bottom-10 whitespace-nowrap ${currentStep >= step.id ? 'text-[#cc0000]' : 'text-slate-600'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-[2.5rem] shadow-2xl p-12 sm:p-20 min-h-[600px] flex flex-col justify-between border border-white/5 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#cc0000]/5 rounded-bl-[5rem] -z-0"></div>
          
          <div className="relative z-10 animate-in fade-in slide-in-from-right-8 duration-500">
            {currentStep === 1 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Sector <br/>Económico</h2>
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
                          ? 'border-[#cc0000] bg-[#cc0000]/10 text-[#cc0000] shadow-2xl' 
                          : 'border-white/5 hover:border-white/20 text-slate-500 bg-white/2'
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
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Dimensiones <br/>del Recinto</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'small', label: 'Compacto', desc: '< 150m²' },
                    { id: 'medium', label: 'Intermedio', desc: '150 - 800m²' },
                    { id: 'large', label: 'Masivo', desc: '> 800m²' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, size: item.label })}
                      className={`p-12 rounded-[2rem] border-2 transition-all text-center ${
                        formData.size === item.label 
                          ? 'border-[#cc0000] bg-[#cc0000]/10 shadow-2xl' 
                          : 'border-white/5 hover:border-white/20 bg-white/2'
                      }`}
                    >
                      <div className="font-black text-2xl mb-2 text-white uppercase tracking-tighter italic">{item.label}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Matriz de <br/>Prioridades</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: 'robo', label: 'Protección de Activos', icon: Target },
                    { id: 'monitoreo', label: 'Centralización de Video', icon: Camera },
                    { id: 'intrusos', label: 'Respuesta ante Intrusos', icon: ShieldAlert },
                    { id: 'incendio', label: 'Seguridad de Vida', icon: AlertTriangle }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePriorityToggle(item.label)}
                      className={`p-8 rounded-[2rem] border-2 transition-all flex items-center gap-6 text-left ${
                        formData.priorities.includes(item.label) 
                          ? 'border-[#cc0000] bg-[#cc0000]/10 shadow-2xl' 
                          : 'border-white/5 hover:border-white/20 bg-white/2'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl ${formData.priorities.includes(item.label) ? 'bg-[#cc0000] text-white shadow-lg shadow-red-900/40' : 'bg-white/5 text-slate-600'}`}>
                        <item.icon className="w-7 h-7" />
                      </div>
                      <span className="font-black text-white uppercase text-xs tracking-widest">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Ubicación <br/>Geográfica</h2>
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Ej. Vitacura, Quilicura, Concepción..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-8 bg-white/5 border-2 border-white/5 rounded-[2rem] focus:border-[#cc0000] outline-none transition-all text-2xl font-black italic uppercase tracking-tighter text-white placeholder:text-slate-700"
                  />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Nuestro algoritmo cruza datos con las tasas de incidencia local para optimizar el equipamiento.</p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Nivel de <br/>Protección</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { id: 'eco', label: 'Esencial', desc: 'Funcionalidad Básica' },
                    { id: 'std', label: 'Avanzado', desc: 'Estándar Corporativo' },
                    { id: 'pro', label: 'Elite', desc: 'Grado Militar / Analítica' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, budget: item.label })}
                      className={`p-12 rounded-[2rem] border-2 transition-all text-center ${
                        formData.budget === item.label 
                          ? 'border-[#cc0000] bg-[#cc0000]/10 shadow-2xl' 
                          : 'border-white/5 hover:border-white/20 bg-white/2'
                      }`}
                    >
                      <div className="font-black text-2xl mb-2 text-white uppercase tracking-tighter italic">{item.label}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-16 mt-16 border-t border-white/5 relative z-10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-10 py-4 font-black uppercase tracking-widest text-xs transition-all ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-white'
              }`}
            >
              Regresar
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
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#cc0000] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white/10 shadow-2xl"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.budget}
                className="px-12 py-5 bg-[#cc0000] text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/40 flex items-center gap-3"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Generar Propuesta IA
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
