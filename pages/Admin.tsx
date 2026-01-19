import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, Database, Save, Trash2, Plus } from 'lucide-react';

export default function Admin() {
  const [pass, setPass] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const { settings, updateSettings, projects, deleteProject } = useData();

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-panel p-10 rounded-[2.5rem] w-full max-w-sm text-center">
          <div className="bg-red-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/30">
            <Lock className="text-[#cc0000]" />
          </div>
          <h2 className="text-xl font-black uppercase mb-8">Consola de Mando</h2>
          <input 
            type="password" 
            placeholder="ACCESS_CODE"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none text-center font-bold tracking-widest text-white mb-6"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <button onClick={() => pass === 'admin2024' && setIsAuth(true)} className="w-full py-4 bg-[#cc0000] text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Desbloquear</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Sistema de <span className="text-[#cc0000]">Gestión</span></h1>
        <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">Sistema: Online</div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10">
          <div className="flex items-center gap-4 mb-10">
            <Database className="text-red-500" />
            <h3 className="font-black uppercase tracking-widest text-xs">Ajustes Globales</h3>
          </div>
          <div className="space-y-6">
            <input 
              className="w-full bg-white/5 p-4 rounded-xl border border-white/5 text-white font-bold outline-none" 
              value={settings.phone}
              onChange={e => updateSettings({...settings, phone: e.target.value})}
            />
            <input 
              className="w-full bg-white/5 p-4 rounded-xl border border-white/5 text-white font-bold outline-none" 
              value={settings.email}
              onChange={e => updateSettings({...settings, email: e.target.value})}
            />
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 flex items-center justify-center gap-2">
              <Save className="w-3 h-3" /> Sincronizar Cambios
            </button>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Plus className="text-red-500" />
              <h3 className="font-black uppercase tracking-widest text-xs">Casos de Éxito</h3>
            </div>
          </div>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="font-bold text-[10px] uppercase">{p.title}</span>
                <button onClick={() => deleteProject(p.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-slate-600 text-[10px] font-black uppercase text-center py-10">Base de datos vacía</p>}
          </div>
        </div>
      </div>
    </div>
  );
}