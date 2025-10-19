// Shared types for the application
export interface Student {
  id: string;
  name: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: string;
  college: string;
  phone?: string;
  cgpa?: string;
  avatar?: string;
  skills?: string[];
}

export interface Drive {
  id: number;
  company: string;
  location: string;
  type: string;
  role: string;
  salary?: string;
  status: "Eligible" | "Not Eligible" | "Applied" | "Selected" | "Rejected";
  deadline: string;
  description?: string;
  requirements?: string[];
  companyLogo?: string;
}

export interface Stats {
  totalDrives: number;
  applied: number;
  eligible: number;
  placed: number;
  interviews: number;
  offers: number;
}

export interface Activity {
  id: string;
  type: "application" | "interview" | "test" | "placement";
  title: string;
  company: string;
  timestamp: string;
  status: "pending" | "completed" | "upcoming";
}