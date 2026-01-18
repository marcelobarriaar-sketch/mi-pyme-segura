import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  CheckCircle, Info, AlertCircle,
  FileText, History, Video, Download, Upload, Database,
  Users, Sun, Wifi, Cpu, Eye, Shield, Zap, Satellite, Activity,
  Layout, Mail, Link as LinkIcon, RefreshCw, Image as ImageIcon
} from 'lucide-react';

const valueIcons: Record<string, any> = {
  Sun, Wifi, Cpu, Eye, Shield, Zap, Satellite, Activity
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { 
    projects, addProject, deleteProject, updateProject,
    equipment, addEquipment, deleteEquipment, updateEquipment,
    aboutValues, updateAboutValue, addAboutValue, deleteAboutValue,
    settings, updateSettings, importData 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'equipment' | 'about' | 'settings'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Forms
  const [projForm, setProjForm] = useState({ 
    title: '', 
    type: '', 
    location: '', 
    description: '', 
    result: '', 
    image: '', 
    supportImages: [] as string[],
    iconType: 'ShieldCheck' 
  });

  const [equipForm, setEquipForm] = useState({ 
    category: '', 
    title: '', 
    image: '', 
    description: '', 
    specs: '', 
    technicalSheetUrl: '', 
    videoUrl: '', 
    updates: '' 
  });

  const [aboutForm, setAboutForm] = useState({ title: '', description: '', iconName: 'Shield' });
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') setIsAuthenticated(true);
    else alert('Acceso Denegado');
  };

  const openAddModal = () => {
    setEditingId(null);
    setProjForm({ title: '', type: '', location: '', description: '', result: '', image: '', supportImages: [], iconType: 'ShieldCheck' });
    setEquipForm({ category: '', title: '', image: '', description: '', specs: '', technicalSheetUrl: '', videoUrl: '', updates: '' });
    setAboutForm({ title: '', description: '', iconName: 'Shield' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'projects') {
      setProjForm({ ...item, supportImages: item.supportImages || [] });
    } else if (activeTab === 'equipment') {
      setEquipForm({ 
        ...item, 
        specs: item.specs.join(', '), 
        technicalSheetUrl: item.technicalSheetUrl || '', 
        videoUrl: item.videoUrl || '',
        updates: item.updates || '' 
      });
    } else if (activeTab === 'about') {
      setAboutForm({ ...item });
    }
    setIsModalOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, { ...projForm, id: editingId });
    } else {
      addProject(projForm);
    }
    setIsModalOpen(false);
  };

  const handleAddSupportImage = () => {
    setProjForm(prev => ({ ...prev, supportImages: [...prev.supportImages, ''] }));
  };

  const handleUpdateSupportImage = (index: number, val: string) => {
    const updated = [...projForm.supportImages];
    updated[index] = val;
    setProjForm(prev => ({ ...prev, supportImages: updated }));
  };

  const handleRemoveSupportImage = (index: number) => {
    setProjForm(prev => ({ ...prev, supportImages: prev.supportImages.filter((_, i) => i !== index) }));
  };

  const handleEquipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedSpecs = equipForm.specs.split(',').map(s => s.trim()).filter(s => s !== '');
    if (editingId) {
      updateEquipment(editingId, { ...equipForm, id: editingId, specs: formattedSpecs });
    } else {
      addEquipment({ ...equipForm, specs: formattedSpecs });
    }
    setIsModalOpen(false);
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAboutValue(editingId, { ...aboutForm, id: editingId });
    } else {
      addAboutValue(aboutForm);
    }
    setIsModalOpen(false);
  };

  const exportBackup = () => {
    const data = { projects, equipment, settings, aboutValues };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MPS_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (confirm('¿Deseas restaurar esta copia de seguridad?')) {
          importData(data);
          alert('Datos restaurados correctamente.');
          window.location.reload();
        }
      } catch (err) {
        alert('Error: Archivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl">
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
              { id: 'about', label: 'Nosotros', icon: Users },
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
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{proj.location}</p>
                    {proj.supportImages?.length > 0 && <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest mt-1 block">+{proj.supportImages.length} FOTOS DE APOYO</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(proj)} className="p-3 text-slate-500 hover:text-white bg-white/5 rounded-lg"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => { if(confirm('¿Seguro?')) deleteProject(proj.id) }} className="p-3 text-slate-500 hover:text-red-500 bg-white/5 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => openEditModal(item)} className="p-2 text-slate-500 hover:text-white bg-white/5 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => { if(confirm('¿Eliminar?')) deleteEquipment(item.id) }} className="p-2 text-slate-500 hover:text-red-500 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            <button onClick={openAddModal} className="mb-8 flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all">
              <Plus className="w-4 h-4" /> Nuevo Diferencial
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutValues.map((val) => {
                const IconComp = valueIcons[val.iconName] || Shield;
                return (
                  <div key={val.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:border-amber-400/30 transition-all flex flex-col gap-6 relative group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#cc0000]/20 p-4 rounded-2xl">
                          <IconComp className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-white font-black uppercase text-sm">{val.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(val)} className="p-3 text-slate-500 hover:text-white bg-white/5 rounded-xl transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { if(confirm('¿Eliminar?')) deleteAboutValue(val.id) }} className="p-3 text-slate-500 hover:text-red-500 bg-white/5 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-4">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Layout className="text-[#cc0000]" /> Interfaz Home</h2>
              <div className="space-y-6">
                <input value={settingsForm.heroTitle} onChange={e => setSettingsForm({...settingsForm, heroTitle: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-black uppercase italic" placeholder="Título Hero" />
                <textarea value={settingsForm.heroSubtitle} onChange={e => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-slate-300 font-medium h-24" placeholder="Subtítulo Hero" />
                <input value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Email Público" />
                <input value={settingsForm.address} onChange={e => setSettingsForm({...settingsForm, address: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Dirección" />
                <input value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Teléfono" />
                <button onClick={() => { updateSettings(settingsForm); alert('Sincronizado'); }} className="w-full bg-[#cc0000] text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-900/40 transition-all"><Save className="w-4 h-4 inline-block mr-2" /> Guardar Cambios</button>
              </div>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-fit">
              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Database className="text-[#cc0000]" /> Respaldo de Datos</h2>
              <button onClick={exportBackup} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] mb-4 hover:bg-amber-400 transition-all"><Download className="w-4 h-4 inline-block mr-2" /> Exportar Backup .JSON</button>
              <button onClick={handleImportClick} className="w-full bg-white/5 border border-white/10 text-slate-400 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white hover:bg-white/10 transition-all"><Upload className="w-4 h-4 inline-block mr-2" /> Importar Backup</button>
              <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={importBackup} />
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
             <div className="w-full max-w-2xl bg-[#020617] border border-white/10 p-10 rounded-[3rem] overflow-y-auto max-h-[90vh]">
               <div className="flex justify-between items-center mb-10 text-white font-black uppercase italic text-xl">
                 <span>{editingId ? 'Editar' : 'Nuevo'} Item - {activeTab.toUpperCase()}</span>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
               </div>
               
               <div className="space-y-6">
                  {activeTab === 'projects' && (
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500">Título</label>
                           <input required value={projForm.title} placeholder="Ej: Red de Salud" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-500">Tipo</label>
                           <input required value={projForm.type} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, type: e.target.value})} />
                        </div>
                      </div>
                      <input required value={projForm.location} placeholder="Ubicación" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, location: e.target.value})} />
                      <input required value={projForm.image} placeholder="URL Imagen Portada" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, image: e.target.value})} />
                      
                      {/* GESTIÓN DINÁMICA DE FOTOS DE APOYO */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black uppercase text-amber-400 tracking-widest">Fotos de Apoyo (Galería)</label>
                          <button type="button" onClick={handleAddSupportImage} className="px-3 py-1 bg-white/10 rounded-lg text-white font-black text-[9px] uppercase tracking-widest hover:bg-amber-400 hover:text-black transition-all">+ Añadir URL de Foto</button>
                        </div>
                        <div className="space-y-2">
                          {projForm.supportImages.map((img, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input value={img} onChange={(e) => handleUpdateSupportImage(idx, e.target.value)} placeholder="https://..." className="flex-grow p-4 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                              <button type="button" onClick={() => handleRemoveSupportImage(idx)} className="p-4 bg-red-900/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          ))}
                          {projForm.supportImages.length === 0 && <p className="text-[9px] text-slate-600 uppercase italic">No hay fotos de apoyo configuradas.</p>}
                        </div>
                      </div>

                      <textarea required value={projForm.description} placeholder="Descripción Técnica" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setProjForm({...projForm, description: e.target.value})} />
                      <input required value={projForm.result} placeholder="Impacto/Resultado" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, result: e.target.value})} />
                      <button type="submit" className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs mt-6">Sincronizar Cambios</button>
                    </form>
                  )}

                  {activeTab === 'equipment' && (
                    <form onSubmit={handleEquipmentSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required value={equipForm.category} placeholder="Categoría" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, category: e.target.value})} />
                        <input required value={equipForm.title} placeholder="Nombre del Equipo" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, title: e.target.value})} />
                      </div>
                      <input required value={equipForm.image} placeholder="URL Imagen Principal" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white text-xs" onChange={e => setEquipForm({...equipForm, image: e.target.value})} />
                      <textarea required value={equipForm.description} placeholder="Resumen Técnico" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-20" onChange={e => setEquipForm({...equipForm, description: e.target.value})} />
                      <input value={equipForm.specs} placeholder="Ficha Técnica (Coma: 4K, IP67, Zoom...)" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, specs: e.target.value})} />
                      <button type="submit" className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs mt-6">Actualizar Hardware</button>
                    </form>
                  )}

                  {activeTab === 'about' && (
                    <form onSubmit={handleAboutSubmit} className="space-y-4">
                      <input required value={aboutForm.title} placeholder="Título Diferencial" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setAboutForm({...aboutForm, title: e.target.value})} />
                      <textarea required value={aboutForm.description} placeholder="Descripción del valor" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setAboutForm({...aboutForm, description: e.target.value})} />
                      <input value={aboutForm.iconName} placeholder="Nombre Icono (Shield, Zap, Sun...)" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setAboutForm({...aboutForm, iconName: e.target.value})} />
                      <button type="submit" className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs mt-6">Guardar Valor</button>
                    </form>
                  )}
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}