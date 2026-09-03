export type CourseCategory = 
  | 'Renforcement' 
  | 'Cardio & HIIT' 
  | 'Bien-être & Douce' 
  | 'Danses & Rythme';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  coach: string;
  coachRole: string;
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  timeStart: string;
  timeEnd: string;
  duration: string;
  location: string;
  room: string;
  level: 'Tous niveaux' | 'Initié' | 'Intensif' | 'Sénior & Débutant';
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  benefits: string[];
  equipmentNeeded: string;
  spotsTotal: number;
  spotsTaken: number;
}

export interface ClubNews {
  id: string;
  title: string;
  date: string;
  category: 'Événement' | 'Stage' | 'Vie du club' | 'Info pratique';
  excerpt: string;
  content: string;
  isImportant?: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceAnnual: number;
  installments?: string;
  badge?: string;
  description: string;
  target: string;
  features: string[];
  recommended?: boolean;
}

export interface Booking {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  isTrial: boolean;
  notes?: string;
  createdAt: string;
}

export interface ClubInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  roomPrimary: string;
  email: string;
  phone: string;
  president: string;
  foundedYear: number;
}
