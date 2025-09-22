import { RecruitmentStage, Candidate } from "@/interface/recruitment.interface";

export const recruitmentStages: RecruitmentStage[] = [
  {
    id: "1",
    name: "Application Review",
    type: "SCREENING",
    manager: "HR Manager",
    order: 1,
  },
  {
    id: "2",
    name: "Phone Screening",
    type: "SCREENING",
    manager: "HR Recruiter",
    order: 2,
  },
  {
    id: "3",
    name: "Technical Interview",
    type: "INTERVIEW",
    manager: "Tech Lead",
    order: 3,
  },
  {
    id: "4",
    name: "Manager Interview",
    type: "INTERVIEW",
    manager: "Hiring Manager",
    order: 4,
  },
  {
    id: "5",
    name: "Final Review",
    type: "FINAL",
    manager: "Director",
    order: 5,
  },
  {
    id: "6",
    name: "Offer Extended",
    type: "OFFER",
    manager: "HR Manager",
    order: 6,
  },
];

export const candidatesData: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    contact: "+1-234-567-8901",
    stageId: "1",
    appliedDate: "2024-01-15",
    resumeUrl: "/assets/documents/payroll-payslip.pdf",
    notes: [
      {
        id: "n1",
        title: "Initial Review",
        note: "Strong technical background, good communication skills",
        createdAt: "2024-01-16T10:30:00Z",
        createdBy: "HR Manager",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    contact: "+1-234-567-8902",
    stageId: "2",
    appliedDate: "2024-01-12",
    resumeUrl: "/assets/documents/payroll-payslip.pdf",
    notes: [
      {
        id: "n2",
        title: "Phone Screening",
        note: "Excellent communication, ready for technical round",
        createdAt: "2024-01-14T14:15:00Z",
        createdBy: "HR Recruiter",
      },
    ],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    contact: "+1-234-567-8903",
    stageId: "3",
    appliedDate: "2024-01-10",
    resumeUrl: "/assets/documents/payroll-payslip.pdf",
    notes: [],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    contact: "+1-234-567-8904",
    stageId: "4",
    appliedDate: "2024-01-08",
    resumeUrl: "/assets/documents/payroll-payslip.pdf",
    notes: [
      {
        id: "n3",
        title: "Technical Assessment",
        note: "Passed technical interview with flying colors",
        createdAt: "2024-01-12T09:00:00Z",
        createdBy: "Tech Lead",
      },
    ],
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert.brown@email.com",
    contact: "+1-234-567-8905",
    stageId: "5",
    appliedDate: "2024-01-05",
    resumeUrl: "/assets/documents/payroll-payslip.pdf",
    notes: [],
  },
];

export const stageTypes = [
  { value: "SCREENING", label: "Screening" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "ASSESSMENT", label: "Assessment" },
  { value: "FINAL", label: "Final Review" },
  { value: "OFFER", label: "Offer" },
  { value: "ONBOARDING", label: "Onboarding" },
];
