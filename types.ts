export interface ProjectConfig {
  businessType: string;
  size: string;
  priorities: string[];
  budget: string;
  location: string;
}

export interface SecurityRecommendation {
  summary: string;
  recommendedHardware: {
    item: string;
    quantity: number;
    description: string;
  }[];
  implementationPlan: string[];
  estimatedTime: string;
}

export interface Equipment {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
  technicalSheetUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  result: string;
  image: string;
  iconType: string;
  supportImages?: string[];
}