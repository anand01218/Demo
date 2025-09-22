// Recruitment related interfaces and types
export interface RecruitmentStage {
  id: string;
  name: string;
  type:
    | "SCREENING"
    | "INTERVIEW"
    | "ASSESSMENT"
    | "FINAL"
    | "OFFER"
    | "ONBOARDING";
  manager: string;
  order: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  contact: string;
  resumeUrl?: string;
  stageId: string;
  appliedDate: string;
  notes?: CandidateNote[];
}

export interface CandidateNote {
  id: string;
  title: string;
  note: string;
  createdAt: string;
  createdBy: string;
}

export interface EmailData {
  to: string;
  subject: string;
  message: string;
}

export type ViewMode = "table" | "grid";
export type ActiveTab = "recruitment-request";
