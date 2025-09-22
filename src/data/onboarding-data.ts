// Onboarding candidate interface
export interface OnboardingCandidate {
  id: number;
  name: string;
  position: string;
  email: string;
  status: "pending" | "in-progress" | "completed" | "paused";
  currentStep: number;
  totalSteps: number;
  joinDate: string;
  phone?: string;
  department?: string;
}

// Onboarding steps
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  completedDate?: string;
}

// Mock data for onboarding candidates
export const onboardingCandidatesData: OnboardingCandidate[] = [
  {
    id: 1,
    name: "John Smith",
    position: "Software Engineer",
    email: "john.smith@company.com",
    status: "in-progress",
    currentStep: 3,
    totalSteps: 5,
    joinDate: "2025-09-15",
    phone: "+1 234-567-8900",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Emily Johnson",
    position: "Product Manager",
    email: "emily.johnson@company.com",
    status: "pending",
    currentStep: 1,
    totalSteps: 5,
    joinDate: "2025-09-20",
    phone: "+1 234-567-8901",
    department: "Product",
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "UX Designer",
    email: "michael.brown@company.com",
    status: "completed",
    currentStep: 5,
    totalSteps: 5,
    joinDate: "2025-09-10",
    phone: "+1 234-567-8902",
    department: "Design",
  },
  {
    id: 4,
    name: "Sarah Davis",
    position: "Marketing Specialist",
    email: "sarah.davis@company.com",
    status: "paused",
    currentStep: 2,
    totalSteps: 5,
    joinDate: "2025-09-18",
    phone: "+1 234-567-8903",
    department: "Marketing",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "DevOps Engineer",
    email: "david.wilson@company.com",
    status: "in-progress",
    currentStep: 4,
    totalSteps: 5,
    joinDate: "2025-09-12",
    phone: "+1 234-567-8904",
    department: "Engineering",
  },
];

// Mock onboarding process steps
export const onboardingStepsData: OnboardingStep[] = [
  {
    id: 1,
    title: "Documentation Review",
    description:
      "Review and sign employment documents, contracts, and company policies",
    status: "completed",
    completedDate: "2025-09-13",
  },
  {
    id: 2,
    title: "IT Setup",
    description:
      "Account creation, equipment assignment, and software access setup",
    status: "completed",
    completedDate: "2025-09-13",
  },
  {
    id: 3,
    title: "Team Introduction",
    description:
      "Meet team members, understand team structure and communication channels",
    status: "current",
  },
  {
    id: 4,
    title: "Training & Orientation",
    description:
      "Complete required training modules and attend orientation sessions",
    status: "pending",
  },
  {
    id: 5,
    title: "Final Assessment",
    description: "Complete onboarding assessment and feedback collection",
    status: "pending",
  },
];
