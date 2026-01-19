import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Equipment } from '../types';

export interface GlobalSettings {
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  contactRecipient: string;
}

interface DataContextType {
  projects: Project[];
  addProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  equipment: Equipment[];
  addEquipment: (e: Equipment) => void;
  deleteEquipment: (id: string) => void;
  settings: GlobalSettings;
  updateSettings: (s: GlobalSettings) => void;
  importData: (data: any) => void;
}

const initialSettings: GlobalSettings = {
  phone: "+56 9 3035 7842",
  email: "contacto@mipymesegura.cl",
  address: "San Martín 267, Fresia, Chile",
  heroTitle: "TU NEGOCIO, BAJO LLAVE",
  heroSubtitle: "Arquitectura de seguridad proactiva. Diseñamos sistemas inteligentes con rastreo en tiempo real.",
  contactRecipient: "ventas@mipymesegura.cl"
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mps_projects_v7');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('mps_equipment_v7');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('mps_settings_v7');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  useEffect(() => localStorage.setItem('mps_projects_v7', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('mps_equipment_v7', JSON.stringify(equipment)), [equipment]);
  useEffect(() => localStorage.setItem('mps_settings_v7', JSON.stringify(settings)), [settings]);

  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));
  const addEquipment = (e: Equipment) => setEquipment(prev => [...prev, e]);
  const deleteEquipment = (id: string) => setEquipment(prev => prev.filter(eq => eq.id !== id));
  const updateSettings = (s: GlobalSettings) => setSettings(s);
  
  const importData = (data: any) => {
    if (data.projects) setProjects(data.projects);
    if (data.equipment) setEquipment(data.equipment);
    if (data.settings) setSettings(data.settings);
  };

  return (
    <DataContext.Provider value={{ 
      projects, addProject, deleteProject,
      equipment, addEquipment, deleteEquipment,
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