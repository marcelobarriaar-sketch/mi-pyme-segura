
import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  Database, Download, Upload, ShieldAlert,
  FileJson, CheckCircle2, AlertCircle,
  // Fix: Import Image from lucide-react as ImageIcon to match usage in component
  Image as ImageIcon
} from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { 
    projects, addProject, deleteProject, updateProject,
    equipment, addEquipment, deleteEquipment, updateEquipment,
    aboutValues, updateAboutValue, addAboutValue, deleteAboutValue,
    settings, updateSettings, importData 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'equipment' | 'about' | 'settings' | 'backup'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStatus, setBackupStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);
  
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

  const [equipForm, setEquipForm] = useState({ category: '', title: '', image: '', description: '', specs: '' });
  const [aboutForm, setAboutForm] = useState({ title: '', description: '', iconName: 'Shield' });
  const [settingsForm, setSettingsForm] = useState(settings);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') setIsAuthenticated(true);
    else alert('Acceso Denegado: Código Táctico Incorrecto');
  };

  const openAddModal = () => {
    setEditingId(null);
    setProjForm({ title: '', type: '', location: '', description: '', result: '', image: '', supportImages: [], iconType: 'ShieldCheck' });
    setEquipForm({ category: '', title: '', image: '', description: '', specs: '' });
    setAboutForm({ title: '', description: '', iconName: 'Shield' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'projects') {
      setProjForm({ ...item, supportImages: item.supportImages || [] });
    } else if (activeTab === 'equipment') {
      setEquipForm({ ...item, specs: item.specs.join(', ') });
    } else if (activeTab === 'about') {
      setAboutForm({ ...item });
    }
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const data = { projects, equipment, aboutValues, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo_mipymesegura_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        importData(json);
        setBackupStatus({ type: 'success', msg: 'Base de datos restaurada correctamente.' });
      } catch (err) {
        setBackupStatus({ type: 'error', msg: 'Archivo inválido o corrupto.' });
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(204,0,0,0.3)]">
          <div className="bg-[#cc0000]/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#cc0000]/40">
            <Lock className="text-[#cc0000] w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase mb-2 tracking-tighter">Mi Pyme Segura</h1>
          <p className="text-slate-500 text-[10px] text-center font-black uppercase tracking-[0.3em] mb-10">Consola de Mando Administrativa</p>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              placeholder="CÓDIGO DE ACCESO"
              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none text-white text-center font-bold tracking-[0.5em] focus:border-[#cc0000] transition-all"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-[#cc0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl shadow-red-900/20">Desbloquear Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-[#cc0000] p-3 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Centro de <span className="text-[#cc0000]">Gestión</span></h1>
          </div>
          <div className="flex flex-wrap justify-center bg-black/40 p-1.5 rounded-2xl border border-white/5 gap-1">
            {[
              { id: 'projects', label: 'Proyectos' },
              { id: 'equipment', label: 'Equipos' },
              { id: 'about', label: 'Nosotros' },
              { id: 'settings', label: 'Global' },
              { id: 'backup', label: 'Respaldo' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#cc0000] text-white shadow-lg shadow-red-900/40' : 'text-slate-500 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'backup' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Download className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">Exportar Respaldo</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Descarga un archivo JSON con todos los proyectos, equipos, valores y configuraciones actuales de la plataforma.</p>
                <button onClick={handleExport} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                  <FileJson className="w-4 h-4" /> Generar Archivo .JSON
                </button>
              </div>

              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Upload className="text-amber-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">Importar Respaldo</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Sube un archivo de respaldo previo para restaurar el contenido. <span className="text-[#cc0000] font-bold">Aviso: Esto reemplazará los datos actuales.</span></p>
                <input 
                  type="file" 
                  accept=".json" 
                  ref={fileInputRef} 
                  onChange={handleImport}
                  className="hidden" 
                />
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                  <Database className="w-4 h-4" /> Seleccionar Archivo
                </button>
              </div>
            </div>

            {backupStatus && (
              <div className={`mt-8 p-6 rounded-2xl border flex items-center gap-4 ${backupStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}>
                {backupStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                <span className="font-black uppercase tracking-widest text-xs">{backupStatus.msg}</span>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'projects' || activeTab === 'equipment' || activeTab === 'about') && (
          <div className="space-y-6">
            <button onClick={openAddModal} className="flex items-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all shadow-xl shadow-white/5">
              <Plus className="w-4 h-4" /> Añadir Nuevo Item
            </button>
            <div className="grid grid-cols-1 gap-4">
              {(activeTab === 'projects' ? projects : activeTab === 'equipment' ? equipment : aboutValues).map((item: any) => (
                <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/10 transition-all">
                  {item.image ? (
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                  ) : (
                    <div className="w-20 h-20 bg-black/40 rounded-xl flex items-center justify-center border border-white/10">
                      <ImageIcon className="text-slate-700" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-white font-black uppercase text-sm mb-1 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-medium">{item.location || item.category || item.description.substring(0, 40) + '...'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(item)} className="p-4 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => {
                      if(confirm('¿Seguro que deseas eliminar este item táctico?')) {
                        if(activeTab === 'projects') deleteProject(item.id);
                        else if(activeTab === 'equipment') deleteEquipment(item.id);
                        else deleteAboutValue(item.id);
                      }
                    }} className="p-4 bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-[#020617] border border-white/10 p-10 rounded-[3rem] overflow-y-auto max-h-[90vh] shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{editingId ? 'MODIFICAR' : 'REGISTRAR'} ITEM</h2>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">Sección: {activeTab}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 text-slate-500 hover:text-white rounded-xl transition-all"><X /></button>
              </div>

              {activeTab === 'projects' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (editingId) updateProject(editingId, { ...projForm, id: editingId });
                  else addProject(projForm);
                  setIsModalOpen(false);
                }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Título del Proyecto</label>
                      <input required placeholder="Ej: Hospital Fresia" value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white focus:border-[#cc0000] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Sector / Tipo</label>
                      <input required placeholder="Ej: Salud Pública" value={projForm.type} onChange={e => setProjForm({...projForm, type: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white focus:border-[#cc0000] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Ubicación Geográfica</label>
                    <input required placeholder="Ciudad, Región" value={projForm.location} onChange={e => setProjForm({...projForm, location: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white focus:border-[#cc0000] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Imagen Principal (URL)</label>
                    <input required placeholder="https://..." value={projForm.image} onChange={e => setProjForm({...projForm, image: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white focus:border-[#cc0000] outline-none transition-all" />
                  </div>
                  
                  <textarea required placeholder="Descripción del despliegue táctico..." value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} className="w-full p-5 bg-white/5 rounded-2xl border border-white/10 text-white h-32 focus:border-[#cc0000] outline-none resize-none transition-all" />
                  <input required placeholder="Impacto o Frase de éxito (Ej: Blindaje total)" value={projForm.result} onChange={e => setProjForm({...projForm, result: e.target.value})} className="w-full p-4 bg-[#cc0000]/10 rounded-xl border border-[#cc0000]/30 text-white italic font-bold placeholder:text-[#cc0000]/50" />
                  
                  <button type="submit" className="w-full bg-[#cc0000] py-6 rounded-2xl text-white font-black uppercase tracking-widest text-xs mt-6 shadow-xl shadow-red-900/20 hover:bg-red-700 transition-all">Guardar en Base de Datos</button>
                </form>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                   <h3 className="text-white font-black uppercase text-sm mb-4">Configuración de Contacto</h3>
                   {/* Formulario de settings aquí si se desea editar directamente */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
