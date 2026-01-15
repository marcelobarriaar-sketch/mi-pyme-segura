
import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  CheckCircle, Info, AlertCircle,
  FileText, History, Video
} from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { 
    projects, addProject, deleteProject, updateProject,
    equipment, addEquipment, deleteEquipment, updateEquipment,
    settings, updateSettings 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'equipment' | 'settings'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Forms
  const [projForm, setProjForm] = useState({ title: '', type: '', location: '', description: '', result: '', image: '', iconType: 'ShieldCheck' });
  const [equipForm, setEquipForm] = useState({ category: '', title: '', image: '', description: '', specs: '', technicalSheetUrl: '', videoUrl: '', updates: '' });
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') setIsAuthenticated(true);
    else alert('Acceso Denegado');
  };

  const openAddModal = () => {
    setEditingId(null);
    setProjForm({ title: '', type: '', location: '', description: '', result: '', image: '', iconType: 'ShieldCheck' });
    setEquipForm({ category: '', title: '', image: '', description: '', specs: '', technicalSheetUrl: '', videoUrl: '', updates: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'projects') {
      setProjForm({ ...item });
    } else {
      setEquipForm({ 
        ...item, 
        specs: item.specs.join(', '), 
        technicalSheetUrl: item.technicalSheetUrl || '', 
        videoUrl: item.videoUrl || '',
        updates: item.updates || '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleProjectSubmit = () => {
    if (editingId) {
      updateProject(editingId, { ...projForm, id: editingId });
    } else {
      addProject(projForm);
    }
    setIsModalOpen(false);
  };

  const handleEquipmentSubmit = () => {
    const formattedSpecs = equipForm.specs.split(',').map(s => s.trim()).filter(s => s !== '');
    if (editingId) {
      updateEquipment(editingId, { ...equipForm, id: editingId, specs: formattedSpecs });
    } else {
      addEquipment({ ...equipForm, specs: formattedSpecs });
    }
    setIsModalOpen(false);
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
                onClick={() => { setActiveTab(tab.id as any); setIsModalOpen(false); }}
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
            <button onClick={openAddModal} className="mb-8 flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cc0000] hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Nuevo Proyecto
            </button>
            
            <div className="grid grid-cols-1 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-[#cc0000]/30 transition-all">
                  <img src={proj.image} className="w-20 h-20 rounded-xl object-cover grayscale group-hover:grayscale-0" />
                  <div className="flex-grow">
                    <h3 className="text-white font-black uppercase text-sm">{proj.title}</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{proj.location} • {proj.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(proj)} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => { if(confirm('¿Seguro que desea eliminar este proyecto?')) deleteProject(proj.id) }} className="p-3 text-slate-500 hover:text-red-500 transition-colors bg-white/5 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB EQUIPOS --- */}
        {activeTab === 'equipment' && (
          <div className="animate-in fade-in duration-300">
            <button onClick={openAddModal} className="mb-8 flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cc0000] hover:text-white transition-all">
              <Plus className="w-4 h-4" /> Registrar Hardware
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipment.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex gap-6 items-start group hover:border-[#cc0000]/30 transition-all">
                  <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <span className="text-[#cc0000] font-black text-[8px] uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-white font-black uppercase text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => openEditModal(item)} className="p-2 text-slate-500 hover:text-white bg-white/5 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => { if(confirm('¿Eliminar equipo del catálogo?')) deleteEquipment(item.id) }} className="p-2 text-slate-500 hover:text-red-500 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
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
                className="w-full bg-[#cc0000] text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-lg shadow-red-900/40"
              >
                <Save className="w-4 h-4" /> Guardar Cambios Globales
              </button>
            </div>
          </div>
        )}

        {/* --- MODAL DE ADICIÓN / EDICIÓN --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="w-full max-w-xl bg-[#020617] border border-white/10 p-10 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <span className="text-[#cc0000] font-black text-[10px] uppercase tracking-widest block mb-1">
                    {editingId ? 'Modo Edición' : 'Nuevo Registro'}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase italic">
                    {activeTab === 'projects' ? 'Proyecto' : 'Equipo Técnico'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-white/5 p-3 rounded-2xl text-slate-500 hover:text-white transition-all"><X /></button>
              </div>

              {activeTab === 'projects' ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre del Proyecto</label>
                    <input value={projForm.title} placeholder="Ej. Sun & Breve Gardens" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Industria</label>
                      <input value={projForm.type} placeholder="Ej. Agrícola" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, type: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ubicación</label>
                      <input value={projForm.location} placeholder="Ej. Osorno, Chile" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, location: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descripción de la Solución</label>
                    <textarea value={projForm.description} placeholder="Detalles técnicos..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24 font-medium" onChange={e => setProjForm({...projForm, description: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Métrica / Resultado</label>
                    <input value={projForm.result} placeholder="Ej. Reducción de incidentes en 100%" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, result: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL de Imagen</label>
                    <input value={projForm.image} placeholder="https://..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, image: e.target.value})} />
                  </div>
                  <button onClick={handleProjectSubmit} className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-red-900/40 hover:bg-red-700 transition-all">
                    {editingId ? <><Save className="w-4 h-4"/> Actualizar Registro</> : <><Plus className="w-4 h-4"/> Publicar Proyecto</>}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
                      <input value={equipForm.category} placeholder="CCTV, Energía..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, category: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Equipo</label>
                      <input value={equipForm.title} placeholder="Nombre del modelo" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, title: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL Imagen</label>
                    <input value={equipForm.image} placeholder="https://..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, image: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <FileText className="w-3 h-3 text-[#cc0000]" /> Enlace Ficha Técnica
                      </label>
                      <input value={equipForm.technicalSheetUrl} placeholder="PDF/WEB URL" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, technicalSheetUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Video className="w-3 h-3 text-[#cc0000]" /> Enlace Video Demostración
                      </label>
                      <input value={equipForm.videoUrl} placeholder="Youtube/Vimeo URL" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, videoUrl: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <History className="w-3 h-3 text-[#cc0000]" /> Notas de Actualización / Versión
                    </label>
                    <textarea value={equipForm.updates} placeholder="Ej. Firmware v2.0: Soporta visión nocturna a color..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-20 font-medium" onChange={e => setEquipForm({...equipForm, updates: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descripción Técnica</label>
                    <textarea value={equipForm.description} placeholder="Características principales..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-20 font-medium" onChange={e => setEquipForm({...equipForm, description: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Especificaciones (Separar por comas)</label>
                    <input value={equipForm.specs} placeholder="Resolución 4K, IP67, Zoom 40x..." className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, specs: e.target.value})} />
                  </div>
                  <button onClick={handleEquipmentSubmit} className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-red-900/40 hover:bg-red-700 transition-all">
                    {editingId ? <><Save className="w-4 h-4"/> Sincronizar Hardware</> : <><Plus className="w-4 h-4"/> Registrar en Catálogo</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
