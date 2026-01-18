import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  LayoutDashboard, Camera, Settings, 
  Database, Download, Upload, Users, Image as ImageIcon
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
  
  const [activeTab, setActiveTab] = useState<'projects' | 'equipment' | 'about' | 'settings'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    else alert('Acceso Denegado');
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

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateProject(editingId, { ...projForm, id: editingId });
    else addProject(projForm);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl">
          <Lock className="text-[#cc0000] w-12 h-12 mx-auto mb-8" />
          <h1 className="text-2xl font-black text-white text-center uppercase mb-8">Consola de Mando</h1>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              placeholder="Código"
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none text-white text-center font-bold tracking-widest"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="w-full bg-[#cc0000] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all">Acceder</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h1 className="text-4xl font-black text-white uppercase italic">Centro de <span className="text-[#cc0000]">Gestión</span></h1>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {['projects', 'equipment', 'about', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#cc0000] text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <button onClick={openAddModal} className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black uppercase text-[10px]"><Plus className="w-4 h-4" /> Nuevo Proyecto</button>
            <div className="grid grid-cols-1 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 group">
                  <img src={proj.image} className="w-16 h-16 rounded-lg object-cover grayscale group-hover:grayscale-0" />
                  <div className="flex-grow">
                    <h3 className="text-white font-black uppercase text-sm">{proj.title}</h3>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">{proj.location}</p>
                    {proj.supportImages?.length > 0 && <span className="text-amber-400 text-[9px] font-black">+{proj.supportImages.length} FOTOS DE APOYO</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(proj)} className="p-3 text-slate-400 hover:text-white"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => deleteProject(proj.id)} className="p-3 text-slate-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div className="w-full max-w-2xl bg-[#020617] border border-white/10 p-10 rounded-[2.5rem] overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-white uppercase italic">{editingId ? 'Editar' : 'Nuevo'} Item</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>

              {activeTab === 'projects' && (
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Título" value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} className="p-4 bg-white/5 rounded-xl border border-white/10 text-white" />
                    <input required placeholder="Tipo" value={projForm.type} onChange={e => setProjForm({...projForm, type: e.target.value})} className="p-4 bg-white/5 rounded-xl border border-white/10 text-white" />
                  </div>
                  <input required placeholder="Ubicación" value={projForm.location} onChange={e => setProjForm({...projForm, location: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" />
                  <input required placeholder="URL Imagen Principal" value={projForm.image} onChange={e => setProjForm({...projForm, image: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white" />
                  
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black uppercase text-amber-400 tracking-[0.3em]">Galería de Apoyo</label>
                      <button type="button" onClick={handleAddSupportImage} className="text-[9px] font-black uppercase bg-white/10 px-3 py-1 rounded-lg text-white hover:bg-amber-400 hover:text-black">+ Añadir Foto</button>
                    </div>
                    <div className="space-y-2">
                      {projForm.supportImages.map((img, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input placeholder="URL Imagen de Apoyo" value={img} onChange={e => handleUpdateSupportImage(idx, e.target.value)} className="flex-grow p-3 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                          <button type="button" onClick={() => handleRemoveSupportImage(idx)} className="p-3 bg-red-900/20 text-red-500 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <textarea required placeholder="Descripción" value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white h-24" />
                  <input required placeholder="Impacto/Resultado" value={projForm.result} onChange={e => setProjForm({...projForm, result: e.target.value})} className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white italic" />
                  <button type="submit" className="w-full bg-[#cc0000] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs mt-6">Guardar Cambios</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}