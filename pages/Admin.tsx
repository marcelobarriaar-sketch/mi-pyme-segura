
import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  ExternalLink, CheckCircle, Info 
} from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { 
    projects, addProject, deleteProject, 
    equipment, addEquipment, deleteEquipment,
    settings, updateSettings 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'equipment' | 'settings'>('projects');
  const [isAdding, setIsAdding] = useState(false);
  
  // Forms
  const [projForm, setProjForm] = useState({ title: '', type: '', location: '', description: '', result: '', image: '', iconType: 'ShieldCheck' });
  const [equipForm, setEquipForm] = useState({ category: '', title: '', image: '', description: '', specs: '' });
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') setIsAuthenticated(true);
    else alert('Acceso Denegado');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl">
          <div className="bg-[#cc0000] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase tracking-tighter italic mb-8">Consola de Mando</h1>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              placeholder="Código de Acceso"
              className="w-full p-5 bg-white/5 border-2 border-white/5 rounded-2xl focus:border-[#cc0000] outline-none text-white font-bold text-center tracking-widest"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="w-full bg-[#cc0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all">
              Autenticar Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-6">
          <div>
            <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">CMS Operativo</span>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Centro de <span className="text-[#cc0000]">Gestión</span></h1>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {[
              { id: 'projects', label: 'Proyectos', icon: LayoutDashboard },
              { id: 'equipment', label: 'Equipos', icon: Camera },
              { id: 'settings', label: 'Global', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setIsAdding(false); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#cc0000] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <tab.icon className="w-3 h-3" /> {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* --- TAB PROYECTOS --- */}
        {activeTab === 'projects' && (
          <div className="animate-in fade-in duration-300">
            <button onClick={() => setIsAdding(true)} className="mb-8 flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cc0000] hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Nuevo Proyecto
            </button>
            
            <div className="grid grid-cols-1 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-[#cc0000]/30">
                  <img src={proj.image} className="w-20 h-20 rounded-xl object-cover grayscale group-hover:grayscale-0" />
                  <div className="flex-grow">
                    <h3 className="text-white font-black uppercase text-sm">{proj.title}</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{proj.location} • {proj.type}</p>
                  </div>
                  <button onClick={() => deleteProject(proj.id)} className="p-3 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB EQUIPOS --- */}
        {activeTab === 'equipment' && (
          <div className="animate-in fade-in duration-300">
            <button onClick={() => setIsAdding(true)} className="mb-8 flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cc0000] hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Registrar Hardware
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipment.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex gap-6 items-start">
                  <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <span className="text-[#cc0000] font-black text-[8px] uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-white font-black uppercase text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{item.description}</p>
                  </div>
                  <button onClick={() => deleteEquipment(item.id)} className="p-2 text-slate-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CONFIGURACIÓN --- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/5 animate-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-black text-white uppercase italic mb-8">Información Global</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dirección Comercial</label>
                <input value={settingsForm.address} onChange={e => setSettingsForm({...settingsForm, address: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Teléfono de Contacto</label>
                  <input value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Corporativo</label>
                  <input value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" />
                </div>
              </div>
              <button 
                onClick={() => { updateSettings(settingsForm); alert('Sincronizado con éxito'); }}
                className="w-full bg-[#cc0000] text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3"
              >
                <Save className="w-4 h-4" /> Guardar Cambios Globales
              </button>
            </div>
          </div>
        )}

        {/* --- MODAL DE ADICIÓN --- */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-xl bg-[#020617] border border-white/10 p-10 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white uppercase italic">Nuevo Registro: {activeTab === 'projects' ? 'Proyecto' : 'Equipo'}</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>

              {activeTab === 'projects' ? (
                <div className="space-y-4">
                  <input placeholder="Título" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, title: e.target.value})} />
                  <input placeholder="Tipo (Comercio, Salud...)" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, type: e.target.value})} />
                  <input placeholder="Ubicación" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, location: e.target.value})} />
                  <textarea placeholder="Descripción" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setProjForm({...projForm, description: e.target.value})} />
                  <input placeholder="URL Imagen" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, image: e.target.value})} />
                  <button onClick={() => { addProject(projForm); setIsAdding(false); }} className="w-full bg-[#cc0000] py-4 rounded-xl text-white font-black uppercase tracking-widest">Publicar Proyecto</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input placeholder="Categoría" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, category: e.target.value})} />
                  <input placeholder="Nombre del Equipo" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, title: e.target.value})} />
                  <input placeholder="URL Imagen" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, image: e.target.value})} />
                  <textarea placeholder="Descripción breve" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setEquipForm({...equipForm, description: e.target.value})} />
                  <input placeholder="Specs (separadas por coma)" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, specs: e.target.value})} />
                  <button onClick={() => { 
                    addEquipment({ ...equipForm, specs: equipForm.specs.split(',').map(s => s.trim()) }); 
                    setIsAdding(false); 
                  }} className="w-full bg-[#cc0000] py-4 rounded-xl text-white font-black uppercase tracking-widest">Añadir al Catálogo</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
