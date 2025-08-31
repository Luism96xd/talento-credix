export interface Country {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Phase {
  id?: string;
  name: string;
  color: string;
  description?: string;
  order: number;
  final_phase?: boolean;
  created_at: Date;
}

export interface Process {
  id: string;
  name: string;
  company_id: string;
  country_id: string;
  position_id: string;
  description?: string;
  status: 'open' | 'paused' | 'closed';
  is_active: boolean;
  companies?: {
    name: string;
  }
  positions?: {
    name: string;
  }
  candidates?: Candidate[];
  phases?: Phase[];
  created_at: string;
}

export interface CompanyIndicators {
  company_name: string
  vacantes_cerradas: number
  vacantes_abiertas: number
  operativo: number
  coordinacion: number
  jefatura: number
  gerencia: number
  avgClosingTime: number | null
  minClosingTime: number | null
  maxClosingTime: number | null
}

export interface RecruiterIndicators {
  recruiter_name: string
  vacantes_cerradas: number
  vacantes_abiertas: number
  operativo: number
  coordinacion: number
  jefatura: number
  gerencia: number
  avgClosingTime: number | null
  minClosingTime: number | null
  maxClosingTime: number | null
}

export interface InternIndicators {
  recruiter_name: string
  vacantes_abiertas: number
  vacantes_cerradas: number
  avgClosingTime: number | null
  minClosingTime: number | null
  maxClosingTime: number | null
}

export interface TimeIndicators {
  avgClosingTime: number | null
  minClosingTime: number | null
  maxClosingTime: number | null
}

export interface ProcessingStats {
  closingTimes: number[]
}
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  gender: string;
  roles: string[];
  department: string;
  permissions: { [module: string]: string[] };
}

export interface Candidate {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  location?: string;
  requisition_id: string;
  recruiter?: string;
  current_phase_id: string;
  photo_url?: string;
  resume_url?: string;
  summary?: string;
  profileData?: {
    summary?: string;
    experience?: WorkExperience[];
    education?: Education[];
    skills?: string[];
  };
  status: string;
  created_at?: Date;
  updated_at?: Date;
  requisition?: Requisition;
}


export interface InvitationData {
  name: string;
  email?: string;
  phone?: string;
}

export interface Requisition {
  id: string
  number: number
  status: string
  created_at: string
  updated_at: string
  country_id: string
  company_id: string
  department_id: string
  position_id: string
  work_location: string
  request_date: string
  requisition_type: string
  contract_type: string
  cargo_type: string
  department_impact: string
  requiere_computador: boolean
  requiere_vehiculo: boolean
  academic_level: string
  technical_competencies: string[]
  key_competencies: string[]

  education: string
  experience: string
  manipula_carga: boolean
  company_impact: string
  requested_by_name: string
  requested_by_position: string
  requested_by_date: string
  approved_by_name: string
  approved_by_position: string
  approved_by_date: string
  assigned_to: string
  country_name: string
  company_name: string
  department_name: string
  position_name: string
  is_confidential: boolean
  candidate_name: string
  closed_date: string
  admission_date: string
  days_open: number
  
  department?: {
    name: string;
  }
  company?: {
    name: string;
  }
  positions?: {
    name: string;
  }
  country?: {
    name: string;
  }
}
export interface KanbanState {
  phases: Phase[];
  candidates: Candidate[];
  processes: Requisition[];
  notifications: NotificationConfig[];
  process: Process;
}
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate?: string;
  current: boolean;
}


export interface RecruiterAssignment {
  id: string;
  recruiter_id: string;
  country_id: string;
  company_id: string;
  department_id: string;
  organizational_level: 'operativo' | 'coordinación' | 'jefatura' | 'gerencia';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  department: string;
  phone?: string;
  specializations: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface NotificationConfig {
  id?: string;
  name: string;
  type: 'webhook' | 'whatsapp' | 'email';
  enabled: boolean;
  config: {
    // For webhook
    url?: string;
    method?: 'POST' | 'PUT';
    headers?: Record<string, string>;
    // For WhatsApp
    phoneNumber?: string;
    apiKey?: string;
    // For Email
    emailTo?: string;
    emailSubject?: string;
    emailTemplate?: string;
  };
  triggers: {
    fromPhaseId?: string;
    toPhaseId?: string;
    allPhases?: boolean;
  };
  created_at?: Date;
}

export type ViewMode = 'kanban' | 'table';

export interface RecruiterAssignment {
  id: string;
  recruiter_id: string;
  country_id: string;
  company_id: string;
  department_id: string;
  position_id: string;
  location: string;
  organizational_level: 'operativo' | 'coordinación' | 'jefatura' | 'gerencia';
  is_active: boolean;
  recruiter?: {
    full_name: string;
  }
  country?: {
    name: string;
  }
  company?: {
    name: string;
  }
  department?: {
    name: string;
  }
  position?: {
    name: string;
  }
  created_at: Date;
  updated_at: Date;
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specializations: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface CandidateDocument {
  id: string;
  candidate_id: string;
  document_type: 'cv' | 'psychometric_test' | 'disc_test' | 'contract' | 'medical_exam' | 'other';
  document_name: string;
  document_url: string;
  created_by?: string;
  uploaded_at: Date;
}

export interface RecruiterMetrics {
  recruiter_id: string;
  recruiter_name: string;
  total_candidates: number;
  hired_candidates: number;
  average_closing_time: number; // in days
  min_closing_time: number; // in days
  max_closing_time: number; // in days
  active_processes: number;
}