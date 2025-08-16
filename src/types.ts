export interface Country {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Phase {
  id: string;
  name: string;
  color: string;
  description?: string;
  order: number;
  createdAt: Date;
}

export interface Process {
  id: string;
  name: string;
  company_id: string;
  country_id: string;
  position_id: string;
  description?: string;
  status: 'active' | 'paused' | 'completed';
  is_active: boolean;
  candidates?: Candidate[];
  phases?: Phase[];
  created_at: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  processId: string;
  currentPhaseId: string;
  resumeUrl?: string;
  summary?: string;
  profileData: {
    experience: WorkExperience[];
    education: Education[];
    skills: string[];
  };
  status: 'active' | 'rejected' | 'hired';
  createdAt: Date;
  updatedAt: Date;
}
export interface Requisition {
  id: string
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

export interface NotificationConfig {
  id: string;
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
  createdAt: Date;
}

export type ViewMode = 'kanban' | 'table';