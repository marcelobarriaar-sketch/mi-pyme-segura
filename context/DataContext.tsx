
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  result: string;
  image: string;
  iconType: string;
}

interface TeamEquipment {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  specs: string[];
}

interface GlobalSettings {
  phone: string;
  email: string;
  address: string;
  instagram?: string;
  facebook?: string;
}

interface DataContextType {
  projects: Project[];
  equipment: TeamEquipment[];
  settings: GlobalSettings;
  addProject: (p: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, p: Project) => void;
  addEquipment: (e: Omit<TeamEquipment, 'id'>) => void;
  deleteEquipment: (id: string) => void;
  updateEquipment: (id: string, e: TeamEquipment) => void;
  updateSettings: (s: GlobalSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: '1',
    title: "Red de salud pública",
    type: "Salud e Infraestructura",
    location: "Fresia, Llanquihue",
    description: "Monitoreo centralizado para hospitales regionales.",
    result: "Blindaje operativo 24/7.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    iconType: 'HeartPulse'
  }
];

const initialEquipment: TeamEquipment[] = [
  {
    id: 'e1',
    category: "CCTV",
    title: "Cámaras Fijas tipo Bala",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
    description: "Diseñadas para disuasión visual de largo alcance.",
    specs: ["Resolución 4K", "Protección IP67"]
  },
  {
    id: 'e2',
    category: "Conectividad",
    title: "Starlink Business",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    description: "Internet satelital para zonas rurales extremas.",
    specs: ["Baja Latencia", "Cobertura Global"]
  }
];

const initialSettings: GlobalSettings = {
  phone: "+56 9 3035 7842",
  email: "contacto@mipymesegura.cl",
  address: "San Martín 267, Fresia, Chile"
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mps_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [equipment, setEquipment] = useState<TeamEquipment[]>(() => {
    const saved = localStorage.getItem('mps_equipment');
    return saved ? JSON.parse(saved) : initialEquipment;
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('mps_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  useEffect(() => localStorage.setItem('mps_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('mps_equipment', JSON.stringify(equipment)), [equipment]);
  useEffect(() => localStorage.setItem('mps_settings', JSON.stringify(settings)), [settings]);

  const addProject = (p: Omit<Project, 'id'>) => setProjects([...projects, { ...p, id: Date.now().toString() }]);
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const updateProject = (id: string, p: Project) => setProjects(projects.map(item => item.id === id ? p : item));

  const addEquipment = (e: Omit<TeamEquipment, 'id'>) => setEquipment([...equipment, { ...e, id: Date.now().toString() }]);
  const deleteEquipment = (id: string) => setEquipment(equipment.filter(e => e.id !== id));
  const updateEquipment = (id: string, e: TeamEquipment) => setEquipment(equipment.map(item => item.id === id ? e : item));

  const updateSettings = (s: GlobalSettings) => setSettings(s);

  return (
    <DataContext.Provider value={{ 
      projects, equipment, settings, 
      addProject, deleteProject, updateProject,
      addEquipment, deleteEquipment, updateEquipment,
      updateSettings
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
