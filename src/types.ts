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
    description?: string;
    phases: Phase[];
    isActive: boolean;
    createdAt: Date;
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
    profileData: {
      experience: WorkExperience[];
      education: Education[];
      skills: string[];
      summary?: string;
    };
    status: 'active' | 'rejected' | 'hired';
    createdAt: Date;
    updatedAt: Date;
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