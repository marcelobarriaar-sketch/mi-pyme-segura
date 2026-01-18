import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  result: string;
  image: string; 
  supportImages: string[]; 
  iconType: string;
}

interface TeamEquipment {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  specs: string[];
  technicalSheetUrl?: string;
  videoUrl?: string;
  updates?: string;
}

interface AboutValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface GlobalSettings {
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  contactRecipient: string;
  instagram?: string;
  facebook?: string;
}

interface DataContextType {
  projects: Project[];
  equipment: TeamEquipment[];
  aboutValues: AboutValue[];
  settings: GlobalSettings;
  addProject: (p: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, p: Project) => void;
  addEquipment: (e: Omit<TeamEquipment, 'id'>) => void;
  deleteEquipment: (id: string) => void;
  updateEquipment: (id: string, e: TeamEquipment) => void;
  addAboutValue: (v: Omit<AboutValue, 'id'>) => void;
  deleteAboutValue: (id: string) => void;
  updateAboutValue: (id: string, v: AboutValue) => void;
  updateSettings: (s: GlobalSettings) => void;
  importData: (data: { projects: Project[], equipment: TeamEquipment[], settings: GlobalSettings, aboutValues: AboutValue[] }) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialAboutValues: AboutValue[] = [
  { id: 'solar', title: 'Energía Solar', description: 'Sistemas autónomos para zonas sin red eléctrica.', iconName: 'Sun' },
  { id: 'enlaces', title: 'Enlaces de Larga Distancia', description: 'Conectividad robusta en terrenos complejos.', iconName: 'Wifi' },
  { id: 'ia', title: 'IA Táctica', description: 'Análisis inteligente para prevención real.', iconName: 'Cpu' },
  { id: 'monitoreo', title: 'Monitoreo 24/7', description: 'Visualización remota desde cualquier lugar.', iconName: 'Eye' }
];

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Red de salud pública y privada",
    type: "Salud e Infraestructura Crítica",
    location: "Fresia, Llanquihue, Frutillar, Maullín, Purranque",
    description: "Implementación integral de sistemas de seguridad y monitoreo centralizado para los Hospitales de Fresia, Llanquihue, Frutillar y Maullín.",
    result: "Blindaje operativo 24/7 en infraestructuras de salud.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    supportImages: [],
    iconType: "HeartPulse"
  }
];

const initialEquipment: TeamEquipment[] = [
  {
    id: "e1",
    category: "CCTV - Vídeo Inteligente",
    title: "Cámaras Fijas tipo Bala",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
    description: "Diseñadas para disuasión visual y monitoreo perimetral de largo alcance.",
    specs: ["Resolución 4K/8K", "Protección IP67", "Analítica de Intrusión"]
  }
];

const initialSettings: GlobalSettings = {
  phone: "+56 9 3035 7842",
  email: "contacto@mipymesegura.cl",
  address: "San Martín 267, Fresia, Chile",
  heroTitle: "TU NEGOCIO, BAJO LLAVE",
  heroSubtitle: "Arquitectura de seguridad proactiva. Diseñamos sistemas inteligentes con rastreo en tiempo real que blindan tu patrimonio.",
  contactRecipient: "gerencia@mipymesegura.cl"
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('mps_projects_v5');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch { return initialProjects; }
  });

  const [equipment, setEquipment] = useState<TeamEquipment[]>(() => {
    try {
      const saved = localStorage.getItem('mps_equipment_v5');
      return saved ? JSON.parse(saved) : initialEquipment;
    } catch { return initialEquipment; }
  });

  const [aboutValues, setAboutValues] = useState<AboutValue[]>(() => {
    try {
      const saved = localStorage.getItem('mps_values_v5');
      return saved ? JSON.parse(saved) : initialAboutValues;
    } catch { return initialAboutValues; }
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    try {
      const saved = localStorage.getItem('mps_settings_v5');
      return saved ? { ...initialSettings, ...JSON.parse(saved) } : initialSettings;
    } catch { return initialSettings; }
  });

  useEffect(() => localStorage.setItem('mps_projects_v5', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('mps_equipment_v5', JSON.stringify(equipment)), [equipment]);
  useEffect(() => localStorage.setItem('mps_values_v5', JSON.stringify(aboutValues)), [aboutValues]);
  useEffect(() => localStorage.setItem('mps_settings_v5', JSON.stringify(settings)), [settings]);

  const addProject = (p: Omit<Project, 'id'>) => setProjects([...projects, { ...p, id: Date.now().toString() }]);
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const updateProject = (id: string, p: Project) => setProjects(projects.map(item => item.id === id ? p : item));

  const addEquipment = (e: Omit<TeamEquipment, 'id'>) => setEquipment([...equipment, { ...e, id: Date.now().toString() }]);
  const deleteEquipment = (id: string) => setEquipment(equipment.filter(e => e.id !== id));
  const updateEquipment = (id: string, e: TeamEquipment) => setEquipment(equipment.map(item => item.id === id ? e : item));

  const addAboutValue = (v: Omit<AboutValue, 'id'>) => setAboutValues([...aboutValues, { ...v, id: Date.now().toString() }]);
  const deleteAboutValue = (id: string) => setAboutValues(aboutValues.filter(v => v.id !== id));
  const updateAboutValue = (id: string, v: AboutValue) => setAboutValues(aboutValues.map(item => item.id === id ? v : item));

  const updateSettings = (s: GlobalSettings) => setSettings(s);

  const importData = (data: any) => {
    if (data.projects) setProjects(data.projects);
    if (data.equipment) setEquipment(data.equipment);
    if (data.settings) setSettings(data.settings);
    if (data.aboutValues) setAboutValues(data.aboutValues);
  };

  return (
    <DataContext.Provider value={{ 
      projects, equipment, aboutValues, settings, 
      addProject, deleteProject, updateProject,
      addEquipment, deleteEquipment, updateEquipment,
      addAboutValue, deleteAboutValue, updateAboutValue, updateSettings, importData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};