
import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  CheckCircle, Info, AlertCircle,
  FileText, History, Video, Download, Upload, Database,
  Users, Sun, Wifi, Cpu, Eye, Shield, Zap, Satellite, Activity,
  Layout, Mail
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
  const [projForm, setProjForm] = useState({ title: '', type: '', location: '', description: '', result: '', image: '', iconType: 'ShieldCheck' });
  const [equipForm, setEquipForm] = useState({ category: '', title: '', image: '', description: '', specs: '', technicalSheetUrl: '', videoUrl: '', updates: '' });
  const [aboutForm, setAboutForm] = useState({ title: '', description: '', iconName: 'Shield' });
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
    setAboutForm({ title: '', description: '', iconName: 'Shield' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'projects') {
      setProjForm({ ...item });
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

  const handleAboutSubmit = () => {
    if (editingId) {
      updateAboutValue(editingId, { ...aboutForm, id: editingId });
    } else {
      addAboutValue(aboutForm);
    }
    setIsModalOpen(false);
  };

  const handleValueInstantUpdate = (id: string, field: 'title' | 'description', value: string) => {
    const original = aboutValues.find(v => v.id === id);
    if (original) {
      updateAboutValue(id, { ...original, [field]: value });
    }
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

        {/* --- TAB NOSOTROS --- */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <button onClick={openAddModal} className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all">
                <Plus className="w-4 h-4" /> Nuevo Diferencial
              </button>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">
                Total Ítems: {aboutValues.length}
              </div>
            </div>

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
                        <div>
                          <span className="text-amber-400 font-black text-[8px] uppercase tracking-widest">Bloque Activo</span>
                          <h3 className="text-white font-black uppercase text-sm tracking-tight">{val.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(val)} className="p-3 text-slate-500 hover:text-white bg-white/5 rounded-xl transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => { if(confirm('¿Eliminar este diferencial?')) deleteAboutValue(val.id) }} className="p-3 text-slate-500 hover:text-red-500 bg-white/5 rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título</label>
                        <input 
                          value={val.title} 
                          onChange={(e) => handleValueInstantUpdate(val.id, 'title', e.target.value)}
                          className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descripción</label>
                        <textarea 
                          value={val.description} 
                          onChange={(e) => handleValueInstantUpdate(val.id, 'description', e.target.value)}
                          className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-slate-400 font-medium text-xs h-20" 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                    <button onClick={() => openEditModal(proj)} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => { if(confirm('¿Seguro?')) deleteProject(proj.id) }} className="p-3 text-slate-500 hover:text-red-500 transition-colors bg-white/5 rounded-lg"><Trash2 className="w-5 h-5" /></button>
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
                    <button onClick={() => { if(confirm('¿Eliminar?')) deleteEquipment(item.id) }} className="p-2 text-slate-500 hover:text-red-500 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CONFIGURACIÓN --- */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-4">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Layout className="text-[#cc0000]" /> Interfaz Home</h2>
              <div className="space-y-6 mb-12">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Frase Central (Hero)</label>
                  <input value={settingsForm.heroTitle} onChange={e => setSettingsForm({...settingsForm, heroTitle: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-black uppercase italic" placeholder="Ej: TU NEGOCIO, BAJO LLAVE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Frase Secundaria (Descripción)</label>
                  <textarea value={settingsForm.heroSubtitle} onChange={e => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-slate-300 font-medium h-24" placeholder="Breve descripción del servicio..." />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Mail className="text-[#cc0000]" /> Canales de Consulta</h2>
              <div className="space-y-6 mb-12">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Destinatario Leads/IA</label>
                  <input value={settingsForm.contactRecipient} onChange={e => setSettingsForm({...settingsForm, contactRecipient: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-amber-400 font-bold" placeholder="Email donde recibirás los proyectos" />
                  <p className="text-[9px] text-slate-500 ml-1">A este correo llegarán los formularios de contacto y diseños de IA.</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Settings className="text-[#cc0000]" /> Contacto Global Público</h2>
              <div className="space-y-6">
                <input value={settingsForm.address} onChange={e => setSettingsForm({...settingsForm, address: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Dirección" />
                <input value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Teléfono" />
                <input value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" placeholder="Email Público" />
                <button onClick={() => { updateSettings(settingsForm); alert('Sincronizado'); }} className="w-full bg-[#cc0000] text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-900/40"><Save className="w-4 h-4 inline-block mr-2" /> Sincronizar Sistema</button>
              </div>
            </div>

            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 flex flex-col">
              <h2 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-3"><Database className="text-[#cc0000]" /> Backup & Respaldo</h2>
              <p className="text-slate-500 text-xs mb-8 leading-relaxed font-medium">Descarga una copia completa de tu base de datos (proyectos, equipos y configuración) para restauración rápida.</p>
              <button onClick={exportBackup} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] mb-4 group transition-all hover:bg-amber-400"><Download className="w-4 h-4 inline-block mr-2 group-hover:animate-bounce" /> Exportar .JSON</button>
              <button onClick={handleImportClick} className="w-full bg-white/5 border border-white/10 text-slate-400 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white hover:bg-white/10 transition-all"><Upload className="w-4 h-4 inline-block mr-2" /> Importar Backup</button>
              <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={importBackup} />
              
              <div className="mt-auto p-6 bg-amber-400/5 border border-amber-400/10 rounded-2xl">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                   <AlertCircle className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Aviso Operativo</span>
                </div>
                <p className="text-slate-400 text-[9px] font-medium leading-relaxed">Los cambios en esta sección afectan la visibilidad pública de la marca. Verifique los textos antes de sincronizar.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- MODALES --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div className="w-full max-w-xl bg-[#020617] border border-white/10 p-10 rounded-[3rem] overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-10 text-white font-black uppercase italic text-xl">
                <span>{editingId ? 'Editar' : 'Nuevo'} {activeTab === 'projects' ? 'Proyecto' : activeTab === 'about' ? 'Diferencial' : 'Equipo'}</span>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <input value={projForm.title} placeholder="Nombre Proyecto" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, title: e.target.value})} />
                  <input value={projForm.type} placeholder="Tipo Industria" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, type: e.target.value})} />
                  <input value={projForm.location} placeholder="Ubicación" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, location: e.target.value})} />
                  <textarea value={projForm.description} placeholder="Descripción" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setProjForm({...projForm, description: e.target.value})} />
                  <input value={projForm.result} placeholder="Métrica / Resultado" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setProjForm({...projForm, result: e.target.value})} />
                  <input value={projForm.image} placeholder="URL Imagen" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setProjForm({...projForm, image: e.target.value})} />
                  <button onClick={handleProjectSubmit} className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs">Guardar Proyecto</button>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="space-y-6">
                  <input value={equipForm.category} placeholder="Categoría" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, category: e.target.value})} />
                  <input value={equipForm.title} placeholder="Nombre Equipo" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, title: e.target.value})} />
                  <input value={equipForm.image} placeholder="URL Imagen" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" onChange={e => setEquipForm({...equipForm, image: e.target.value})} />
                  <textarea value={equipForm.description} placeholder="Descripción técnica" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setEquipForm({...equipForm, description: e.target.value})} />
                  <input value={equipForm.specs} placeholder="Specs (comas)" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setEquipForm({...equipForm, specs: e.target.value})} />
                  <button onClick={handleEquipmentSubmit} className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs">Guardar Equipo</button>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-6">
                  <input value={aboutForm.title} placeholder="Título del Diferencial" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white font-bold" onChange={e => setAboutForm({...aboutForm, title: e.target.value})} />
                  <textarea value={aboutForm.description} placeholder="Descripción corta" className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" onChange={e => setAboutForm({...aboutForm, description: e.target.value})} />
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Seleccionar Icono</label>
                    <div className="grid grid-cols-4 gap-3">
                      {Object.keys(valueIcons).map(iconName => {
                        const Icon = valueIcons[iconName];
                        return (
                          <button 
                            key={iconName}
                            onClick={() => setAboutForm({...aboutForm, iconName})}
                            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center ${aboutForm.iconName === iconName ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-white/5 text-slate-600 hover:border-white/20'}`}
                          >
                            <Icon className="w-5 h-5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button onClick={handleAboutSubmit} className="w-full bg-amber-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Sincronizar Diferencial</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
