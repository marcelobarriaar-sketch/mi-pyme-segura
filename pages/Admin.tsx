import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  Lock, Plus, Trash2, Edit3, Save, X, 
  Settings, Database, Download, Upload, 
  FileJson, CheckCircle2, AlertCircle,
  Image as ImageIcon,
  LayoutGrid,
  Shield,
  Info
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStatus, setBackupStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin2024') {
      setIsAuthenticated(true);
      setBackupStatus(null);
    } else {
      alert('CÓDIGO TÁCTICO INCORRECTO');
    }
  };

  const handleExport = () => {
    const data = { projects, equipment, aboutValues, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo_mipymesegura_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setBackupStatus({ type: 'success', msg: 'Respaldo generado correctamente.' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        importData(json);
        setBackupStatus({ type: 'success', msg: 'SISTEMA RESTAURADO: Base de datos actualizada con éxito.' });
      } catch (err) {
        setBackupStatus({ type: 'error', msg: 'FALLA DE INTEGRIDAD: El archivo no es válido.' });
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
        <div className="w-full max-w-md bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="bg-[#cc0000]/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#cc0000]/40">
            <Lock className="text-[#cc0000] w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-white text-center uppercase mb-2 tracking-tighter">Mi Pyme Segura</h1>
          <p className="text-slate-500 text-[10px] text-center font-black uppercase tracking-[0.3em] mb-10">Consola de Mando</p>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" 
              placeholder="CÓDIGO DE ACCESO"
              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl outline-none text-white text-center font-bold tracking-[0.5em] focus:border-[#cc0000] transition-all"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
            />
            <button type="submit" className="w-full bg-[#cc0000] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all">Desbloquear</button>
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
            <div className="bg-[#cc0000] p-3 rounded-xl"><Settings className="w-6 h-6 text-white" /></div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Centro de <span className="text-[#cc0000]">Gestión</span></h1>
          </div>
          <div className="flex flex-wrap justify-center bg-black/40 p-1.5 rounded-2xl border border-white/5 gap-1">
            {[
              { id: 'projects', label: 'Proyectos', icon: LayoutGrid },
              { id: 'equipment', label: 'Equipos', icon: Shield },
              { id: 'about', label: 'Nosotros', icon: Info },
              { id: 'settings', label: 'Global', icon: Settings },
              { id: 'backup', label: 'Respaldo', icon: Database }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#cc0000] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'backup' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                <Download className="text-blue-500 w-10 h-10 mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">Exportar Base de Datos</h3>
                <p className="text-slate-400 text-sm mb-8 font-medium">Crea una copia de seguridad local de todos los proyectos, equipos y configuraciones actuales.</p>
                <button onClick={handleExport} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all">
                  <FileJson className="w-4 h-4" /> Generar JSON de Respaldo
                </button>
              </div>

              <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                <Upload className="text-amber-500 w-10 h-10 mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">Importar Respaldo</h3>
                <p className="text-slate-400 text-sm mb-8 font-medium">Restaura una configuración previa subiendo el archivo .json de respaldo.</p>
                <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all">
                  <Database className="w-4 h-4" /> Cargar Archivo .JSON
                </button>
              </div>
            </div>
            {backupStatus && (
              <div className={`mt-8 p-6 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-2 ${backupStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}>
                {backupStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-black uppercase tracking-widest text-[10px]">{backupStatus.msg}</span>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'projects' || activeTab === 'equipment' || activeTab === 'about') && (
          <div className="space-y-6">
             <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">
                  Total items: {activeTab === 'projects' ? projects.length : activeTab === 'equipment' ? equipment.length : aboutValues.length}
                </span>
                <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#cc0000] hover:text-white transition-all shadow-xl">
                  Añadir Nuevo
                </button>
             </div>
             <div className="grid grid-cols-1 gap-4">
               {(activeTab === 'projects' ? projects : activeTab === 'equipment' ? equipment : aboutValues).map((item: any) => (
                 <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/10 transition-all">
                   <div className="w-20 h-20 bg-black/40 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                     {item.image ? (
                       <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.title} />
                     ) : (
                       <ImageIcon className="text-slate-700 w-8 h-8" />
                     )}
                   </div>
                   <div className="flex-grow">
                     <h3 className="text-white font-black uppercase text-sm mb-1">{item.title}</h3>
                     <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                       {item.location || item.category || 'Valor Corporativo'}
                     </p>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-4 bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all" title="Editar">
                        <Edit3 className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => { if(confirm('¿Seguro que deseas eliminar este item?')) { if(activeTab === 'projects') deleteProject(item.id); else if(activeTab === 'equipment') deleteEquipment(item.id); else deleteAboutValue(item.id); } }} 
                        className="p-4 bg-white/5 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
            <h3 className="text-2xl font-black text-white uppercase italic mb-10">Configuración Global</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Público</label>
                <input 
                  type="text" 
                  value={settings.email} 
                  onChange={(e) => updateSettings({...settings, email: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold outline-none focus:border-[#cc0000]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Teléfono</label>
                <input 
                  type="text" 
                  value={settings.phone} 
                  onChange={(e) => updateSettings({...settings, phone: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold outline-none focus:border-[#cc0000]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dirección Física</label>
                <input 
                  type="text" 
                  value={settings.address} 
                  onChange={(e) => updateSettings({...settings, address: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold outline-none focus:border-[#cc0000]"
                />
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
               <button onClick={() => alert('Configuración guardada en caché local')} className="px-10 py-5 bg-[#cc0000] text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all flex items-center gap-3">
                 <Save className="w-4 h-4" /> Guardar Cambios
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}