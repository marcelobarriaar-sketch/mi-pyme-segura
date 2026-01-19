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