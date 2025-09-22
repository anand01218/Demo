export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other" | "";
  nationality: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "";
  bloodGroup: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  alternatePhone: string;
  currentAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  permanentAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  sameAsCurrent: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: string;
  percentage: string;
  certification?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  responsibilities: string;
  salary: string;
  reasonForLeaving?: string;
}

export interface Documents {
  resume?: File;
  photo?: File;
  aadharCard?: File;
  panCard?: File;
  educationCertificates?: File[];
  experienceCertificates?: File[];
}

export interface ApplicationFormData {
  personalInfo: PersonalInfo;
  contactDetails: ContactDetails;
  education: Education[];
  experience: Experience[];
  documents: Documents;
  desiredPosition: string;
  expectedSalary: string;
  noticePeriod: string;
  additionalComments: string;
}

export interface FormStage {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}
