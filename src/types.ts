export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'industries'
  | 'technologies'
  | 'careers'
  | 'contact'
  | 'login'
  | 'signup'
  | 'profile'
  | 'admin'
  | 'privacy'
  | 'terms'
  | 'auth-callback'
  | 'notfound';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  keyFeatures: string[];
  deliverables: string[];
  technologiesUsed: string[];
  imageUrl: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  complianceStandards: string[];
  imageUrl: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: 'Backend' | 'Frontend / Mobile' | 'Systems' | 'Cloud & DevOps' | 'AI & Data';
  description: string;
  keyCapabilities: string[];
  useCases: string[];
  iconName: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: 'Engineering' | 'Cloud & DevOps' | 'AI Solutions' | 'Product & Design' | 'Quality Assurance';
  location: string;
  type: 'Full-time' | 'Hybrid' | 'Remote';
  experience: string;
  summary: string;
  requirements: string[];
  responsibilities: string[];
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  type: 'Corporate Headquarters' | 'Global R&D Center' | 'Regional Office';
}

export interface SocialLinks {
  linkedin: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
}
