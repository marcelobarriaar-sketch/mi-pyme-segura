
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  result: string;
  image: string;
  iconType: 'HeartPulse' | 'Building2' | 'GraduationCap' | 'ShieldCheck' | 'Target';
}

interface TeamEquipment {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  specs: string[];
}

interface DataContextType {
  projects: Project[];
  equipment: TeamEquipment[];
  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: string, p: Project) => void;
  deleteProject: (id: string) => void;
  updateEquipment: (id: string, e: TeamEquipment) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Datos iniciales para que el sitio no nazca vacío
const initialProjects: Project[] = [
  {
    id: '1',
    title: "Red de salud pública y privada",
    type: "Salud e Infraestructura Crítica",
    location: "Fresia, Llanquihue, Frutillar, Maullín, Purranque",
    description: "Implementación integral de sistemas de seguridad y monitoreo centralizado para los Hospitales de Fresia, Llanquihue, Frutillar y Maullín.",
    result: "Blindaje operativo 24/7 en infraestructuras de salud.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    iconType: 'HeartPulse'
  },
  {
    id: '2',
    title: "Estamentos Públicos y Privados",
    type: "Gobierno y Gestión Comunitaria",
    location: "Fresia, Región de Los Lagos",
    description: "Despliegue de vigilancia urbana estratégica para la Ilustre Municipalidad de Fresia y sedes vecinales.",
    result: "Aumento significativo en la protección comunitaria.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200",
    iconType: 'Building2'
  }
];

const initialEquipment: TeamEquipment[] = [
  {
    id: 'e1',
    category: "CCTV - Vídeo Inteligente",
    title: "Cámaras Fijas tipo Bala",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
    description: "Diseñadas para disuasión visual y monitoreo perimetral de largo alcance.",
    specs: ["Resolución 4K/8K", "Protección IP67", "Analítica de Intrusión"]
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mps_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [equipment, setEquipment] = useState<TeamEquipment[]>(() => {
    const saved = localStorage.getItem('mps_equipment');
    return saved ? JSON.parse(saved) : initialEquipment;
  });

  useEffect(() => {
    localStorage.setItem('mps_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mps_equipment', JSON.stringify(equipment));
  }, [equipment]);

  const addProject = (p: Omit<Project, 'id'>) => {
    setProjects([...projects, { ...p, id: Date.now().toString() }]);
  };

  const updateProject = (id: string, p: Project) => {
    setProjects(projects.map(proj => proj.id === id ? p : proj));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateEquipment = (id: string, e: TeamEquipment) => {
    setEquipment(equipment.map(item => item.id === id ? e : item));
  };

  return (
    <DataContext.Provider value={{ projects, equipment, addProject, updateProject, deleteProject, updateEquipment }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
