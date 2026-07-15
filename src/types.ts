export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: 'general' | 'thanawya' | 'preparatory' | 'diploma' | 'azhar';
  imageUrl?: string;
}

export interface GovernorateStatus {
  id: string;
  name: string; // Governorate Name in Arabic (e.g., القاهرة، الجيزة)
  status: 'available' | 'soon' | 'active'; // available, soon, active (under processing)
  percentage?: number; // Success rate if available
  announcementDate?: string;
}

export interface UniversityCollege {
  id: string;
  name: string;
  category: 'medical' | 'engineering' | 'scientific' | 'humanities' | 'applied';
  type: 'public' | 'private' | 'ahlia';
  minPercentage: number; // e.g., 91.5
  feesArabic?: string; // Annual fees in EGP or description
  location?: string;
  description: string;
}

export interface Subject {
  id: string;
  name: string;
  maxScore: number;
  minScore: number;
}

export interface GrievanceStep {
  step: number;
  title: string;
  description: string;
}

export interface UniversityFeesItem {
  university: string;
  type: 'private' | 'ahlia' | 'foreign';
  faculties: {
    name: string;
    fees: string;
  }[];
}
