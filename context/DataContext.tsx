
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
    id: '1',
    title: "Red de Salud Pública",
    type: "Salud e Infraestructura",
    location: "Fresia, Región de Los Lagos",
    description: "Implementación de monitoreo centralizado y control de acceso para centros hospitalarios rurales, asegurando la continuidad operativa del personal médico.",
    result: "Blindaje operativo 24/7 y reducción de incidentes en un 95%.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    iconType: 'HeartPulse'
  },
  {
    id: '2',
    title: "Sun & Breve Gardens",
    type: "Agrícola y Paisajismo",
    location: "Osorno, Chile",
    description: "Sistema de vigilancia autónoma con energía solar para la protección de viveros y plantaciones de alto valor en zonas sin conectividad eléctrica tradicional.",
    result: "Cero intrusiones registradas desde la implementación del anillo perimetral.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1200",
    iconType: 'Target'
  },
  {
    id: '3',
    title: "Centro Logístico Retail",
    type: "Comercio y Distribución",
    location: "Puerto Montt, Región de Los Lagos",
    description: "Instalación de analítica de video avanzada para prevención de mermas y control de inventarios en tiempo real para grandes superficies comerciales.",
    result: "Optimización del flujo logístico y reducción drástica de pérdida desconocida.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    iconType: 'Building2'
  },
  {
    id: '4',
    title: "Complejo Acuícola Austral",
    type: "Industria Salmonera",
    location: "Canal de Chacao, Chile",
    description: "Monitoreo remoto de balsas jaula mediante enlaces Starlink y cámaras térmicas de largo alcance, integradas para detectar actividad sospechosa en el mar.",
    result: "Control total del perímetro marítimo desde la central de mando en tierra.",
    image: "https://images.unsplash.com/photo-1516491617482-bc91d0c4d722?auto=format&fit=crop&q=80&w=1200",
    iconType: 'ShieldCheck'
  }
];

const initialEquipment: TeamEquipment[] = [
  {
    id: 'e1',
    category: "CCTV",
    title: "Cámaras Fijas tipo Bala",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
    description: "Diseñadas para disuasión visual de largo alcance con visión nocturna infrarroja.",
    specs: ["Resolución 4K UHD", "Protección IP67 (Clima Extremo)", "Analítica Humano/Vehículo"],
    technicalSheetUrl: "https://www.hikvision.com/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2087g2-lu/",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    updates: "Firmware v5.7.10 compatible con IA avanzada."
  },
  {
    id: 'e2',
    category: "Conectividad",
    title: "Starlink Business Elite",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    description: "Internet satelital de alta velocidad para monitoreo remoto en zonas rurales extremas o marítimas.",
    specs: ["Baja Latencia", "Cobertura Global", "Resiliencia Climática"],
    technicalSheetUrl: "https://www.starlink.com/business",
    videoUrl: "https://www.youtube.com/watch?v=h_Tf9U_zF7c",
    updates: "Optimización de señal para zonas marítimas activada."
  },
  {
    id: 'e3',
    category: "Energía",
    title: "Estación Solar Autónoma",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=800",
    description: "Suministro eléctrico ininterrumpido mediante paneles solares y baterías de litio para cámaras en campos.",
    specs: ["Autonomía 48 hrs sin sol", "Control de Carga Inteligente", "Cero cables externos"],
    updates: "Baterías de Litio Ferro-Fosfato de nueva generación."
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

  const [aboutValues, setAboutValues] = useState<AboutValue[]>(() => {
    const saved = localStorage.getItem('mps_about_values');
    return saved ? JSON.parse(saved) : initialAboutValues;
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('mps_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  useEffect(() => localStorage.setItem('mps_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('mps_equipment', JSON.stringify(equipment)), [equipment]);
  useEffect(() => localStorage.setItem('mps_about_values', JSON.stringify(aboutValues)), [aboutValues]);
  useEffect(() => localStorage.setItem('mps_settings', JSON.stringify(settings)), [settings]);

  const addProject = (p: Omit<Project, 'id'>) => setProjects([...projects, { ...p, id: Date.now().toString() }]);
  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const updateProject = (id: string, p: Project) => setProjects(projects.map(item => item.id === id ? p : item));

  const addEquipment = (e: Omit<TeamEquipment, 'id'>) => setEquipment([...equipment, { ...e, id: Date.now().toString() }]);
  const deleteEquipment = (id: string) => setEquipment(equipment.filter(e => e.id !== id));
  const updateEquipment = (id: string, e: TeamEquipment) => setEquipment(equipment.map(item => item.id === id ? e : item));

  const updateAboutValue = (id: string, v: AboutValue) => setAboutValues(aboutValues.map(item => item.id === id ? v : item));

  const updateSettings = (s: GlobalSettings) => setSettings(s);

  const importData = (data: { projects: Project[], equipment: TeamEquipment[], settings: GlobalSettings, aboutValues: AboutValue[] }) => {
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
      updateAboutValue, updateSettings, importData
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
