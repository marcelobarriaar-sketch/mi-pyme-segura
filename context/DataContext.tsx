
import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfaces for the data
export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  result: string;
  image: string;
  iconType: string;
  // Added supportImages to resolve errors in PastProjects.tsx
  supportImages?: string[];
}

// Added Equipment interface to resolve errors in Teams.tsx and Admin.tsx
export interface Equipment {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
  technicalSheetUrl?: string;
  updates?: string;
}

// Added AboutValue interface to resolve errors in About.tsx and Admin.tsx
export interface AboutValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GlobalSettings {
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  // Added contactRecipient to resolve errors in ProjectBuilder.tsx and Contact.tsx
  contactRecipient?: string;
}

interface DataContextType {
  projects: Project[];
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (p: Project) => void;
  equipment: Equipment[];
  addEquipment: (e: Equipment) => void;
  deleteEquipment: (id: string) => void;
  updateEquipment: (e: Equipment) => void;
  aboutValues: AboutValue[];
  addAboutValue: (v: AboutValue) => void;
  deleteAboutValue: (id: string) => void;
  updateAboutValue: (v: AboutValue) => void;
  settings: GlobalSettings;
  updateSettings: (s: GlobalSettings) => void;
  importData: (data: any) => void;
}

const initialSettings: GlobalSettings = {
  phone: "+56 9 3035 7842",
  email: "contacto@mipymesegura.cl",
  address: "San Martín 267, Fresia, Chile",
  heroTitle: "TU NEGOCIO, BAJO LLAVE",
  heroSubtitle: "Arquitectura de seguridad proactiva. Diseñamos sistemas inteligentes con rastreo en tiempo real que blindan tu patrimonio.",
  contactRecipient: "ventas@mipymesegura.cl"
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence using specific keys for each data type
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mps_projects_v6');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('mps_equipment_v6');
    return saved ? JSON.parse(saved) : [];
  });

  const [aboutValues, setAboutValues] = useState<AboutValue[]>(() => {
    const saved = localStorage.getItem('mps_about_v6');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Visión IA', description: 'Identificación de patrones sospechosos avanzada.', iconName: 'Eye' },
      { id: '2', title: 'Blindaje Total', description: 'Sistemas de intrusión de grado profesional.', iconName: 'Shield' },
      { id: '3', title: 'Control Remoto', description: 'Gestión completa desde cualquier dispositivo.', iconName: 'Zap' }
    ];
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('mps_settings_v6');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Side effects for localStorage persistence
  useEffect(() => localStorage.setItem('mps_projects_v6', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('mps_equipment_v6', JSON.stringify(equipment)), [equipment]);
  useEffect(() => localStorage.setItem('mps_about_v6', JSON.stringify(aboutValues)), [aboutValues]);
  useEffect(() => localStorage.setItem('mps_settings_v6', JSON.stringify(settings)), [settings]);

  // Project Management Actions
  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));
  const updateProject = (p: Project) => setProjects(prev => prev.map(proj => proj.id === p.id ? p : proj));

  // Equipment Management Actions
  const addEquipment = (e: Equipment) => setEquipment(prev => [...prev, e]);
  const deleteEquipment = (id: string) => setEquipment(prev => prev.filter(eq => eq.id !== id));
  const updateEquipment = (e: Equipment) => setEquipment(prev => prev.map(eq => eq.id === e.id ? e : eq));

  // About Values Management Actions
  const addAboutValue = (v: AboutValue) => setAboutValues(prev => [...prev, v]);
  const deleteAboutValue = (id: string) => setAboutValues(prev => prev.filter(val => val.id !== id));
  const updateAboutValue = (v: AboutValue) => setAboutValues(prev => prev.map(val => val.id === v.id ? v : val));

  const updateSettings = (s: GlobalSettings) => setSettings(s);
  
  const importData = (data: any) => {
    if (data.projects) setProjects(data.projects);
    if (data.equipment) setEquipment(data.equipment);
    if (data.aboutValues) setAboutValues(data.aboutValues);
    if (data.settings) setSettings(data.settings);
  };

  return (
    <DataContext.Provider value={{ 
      projects, addProject, deleteProject, updateProject,
      equipment, addEquipment, deleteEquipment, updateEquipment,
      aboutValues, addAboutValue, deleteAboutValue, updateAboutValue,
      settings, updateSettings, importData 
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
