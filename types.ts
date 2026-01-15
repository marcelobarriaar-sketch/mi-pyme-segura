
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

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface PastProject {
  id: number;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  results: string;
}
