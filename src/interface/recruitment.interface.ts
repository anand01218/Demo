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

export interface CandidateGridViewProps {
  searchTerm: string;
  // eslint-disable-next-line no-unused-vars
  onEmailCandidate: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNote: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewNotes: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewResume: (_resumeUrl: string) => void;
}

export interface SortableCandidateCardProps {
  candidate: Candidate;
  // eslint-disable-next-line no-unused-vars
  onEmailCandidate: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNote: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewNotes: (_candidate: Candidate) => void;
  // eslint-disable-next-line no-unused-vars
  onViewResume: (_resumeUrl: string) => void;
  isLastStage?: boolean;
}

export type ViewMode = "table" | "grid";
export type ActiveTab = "recruitment-request";
