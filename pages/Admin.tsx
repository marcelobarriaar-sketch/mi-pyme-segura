
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, Plus, Trash2, Edit3, Save, X, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { projects, addProject, deleteProject, updateProject } = useData();
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProj, setNewProj] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
    result: '',
    image: '',
    iconType: 'ShieldCheck' as any
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') setIsAuthenticated(true); // Clave técnica inicial
    else alert('Acceso Denegado');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl">
          <div className="bg-[#cc0000] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase tracking-tighter italic mb-8">Acceso Operativo</h1>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              placeholder="Código de Enlace"
              className="w-full p-5 bg-white/5 border-2 border-white/5 rounded-2xl focus:border-[#cc0000] outline-none text-white font-bold text-center tracking-widest"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="w-full bg-[#cc0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all">
              Sincronizar Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">CMS Interno</span>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">Gestión de <span className="text-[#cc0000]">Contenido</span></h1>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#cc0000] hover:text-white transition-all shadow-2xl"
          >
            <Plus className="w-4 h-4" /> Nuevo Proyecto
          </button>
        </div>

        {isAdding && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-2xl bg-[#0f172a] p-10 rounded-[3rem] border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white uppercase italic">Registrar Operación</h2>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <div className="space-y-6">
                <input placeholder="Título del Proyecto" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} />
                <input placeholder="Tipo (ej. Salud, Comercio)" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white" value={newProj.type} onChange={e => setNewProj({...newProj, type: e.target.value})} />
                <input placeholder="Ubicación" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white" value={newProj.location} onChange={e => setNewProj({...newProj, location: e.target.value})} />
                <textarea placeholder="Descripción detallada" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white h-32" value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} />
                <input placeholder="Métrica de Impacto (Resultado)" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white" value={newProj.result} onChange={e => setNewProj({...newProj, result: e.target.value})} />
                <input placeholder="URL de Imagen (Unsplash o Directa)" className="w-full p-4 bg-white/5 rounded-xl border border-white/5 text-white" value={newProj.image} onChange={e => setNewProj({...newProj, image: e.target.value})} />
                
                <button 
                  onClick={() => {
                    addProject(newProj);
                    setIsAdding(false);
                  }}
                  className="w-full bg-[#cc0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest"
                >
                  Guardar en Base de Datos
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {projects.map(proj => (
            <div key={proj.id} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 group hover:border-[#cc0000]/30 transition-all">
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={proj.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-white font-black uppercase tracking-tight text-lg">{proj.title}</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">{proj.location}</p>
                <p className="text-slate-400 text-sm line-clamp-1">{proj.description}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => deleteProject(proj.id)} className="p-4 bg-white/5 hover:bg-red-900/40 text-red-500 rounded-xl transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
