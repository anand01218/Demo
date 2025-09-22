"use client";
import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import Stepper from "@/components/common/Stepper";
import PersonalInfoStage from "@/components/pagesUI/application-form/PersonalInfoStage";
import ContactDetailsStage from "@/components/pagesUI/application-form/ContactDetailsStage";
import EducationStage from "@/components/pagesUI/application-form/EducationStage";
import ExperienceStage from "@/components/pagesUI/application-form/ExperienceStage";
import DocumentsReviewStage from "@/components/pagesUI/application-form/DocumentsReviewStage";
import {
  ApplicationFormData,
  FormStage,
  PersonalInfo,
  ContactDetails,
  Education,
  Experience,
  Documents,
} from "@/interface/applicationForm.interface";

const ApplicationFormPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      maritalStatus: "",
      bloodGroup: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
    },
    contactDetails: {
      email: "",
      phone: "",
      alternatePhone: "",
      currentAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      permanentAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      sameAsCurrent: false,
    },
    education: [],
    experience: [],
    documents: {},
    desiredPosition: "",
    expectedSalary: "",
    noticePeriod: "",
    additionalComments: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stages: FormStage[] = [
    {
      id: 1,
      title: "Personal Info",
      description: "Basic information",
      isCompleted: currentStage > 1,
      isActive: currentStage === 1,
    },
    {
      id: 2,
      title: "Contact Details",
      description: "Address & contact",
      isCompleted: currentStage > 2,
      isActive: currentStage === 2,
    },
    {
      id: 3,
      title: "Education",
      description: "Academic background",
      isCompleted: currentStage > 3,
      isActive: currentStage === 3,
    },
    {
      id: 4,
      title: "Experience",
      description: "Work history",
      isCompleted: currentStage > 4,
      isActive: currentStage === 4,
    },
    {
      id: 5,
      title: "Documents & Review",
      description: "Upload & submit",
      isCompleted: false,
      isActive: currentStage === 5,
    },
  ];

  // Validation functions
  const validatePersonalInfo = (data: PersonalInfo): any => {
    const errors: any = {};

    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!data.gender) errors.gender = "Gender is required";
    if (!data.nationality.trim())
      errors.nationality = "Nationality is required";
    if (!data.maritalStatus)
      errors.maritalStatus = "Marital status is required";
    if (!data.emergencyContactName.trim())
      errors.emergencyContactName = "Emergency contact name is required";
    if (!data.emergencyContactPhone.trim())
      errors.emergencyContactPhone = "Emergency contact phone is required";
    if (!data.emergencyContactRelation.trim())
      errors.emergencyContactRelation =
        "Emergency contact relation is required";

    return errors;
  };

  const validateContactDetails = (data: ContactDetails): any => {
    const errors: any = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.phone.trim()) errors.phone = "Phone number is required";

    // Current address validation
    const currentAddressErrors: any = {};
    if (!data.currentAddress.street.trim())
      currentAddressErrors.street = "Street address is required";
    if (!data.currentAddress.city.trim())
      currentAddressErrors.city = "City is required";
    if (!data.currentAddress.state.trim())
      currentAddressErrors.state = "State is required";
    if (!data.currentAddress.zipCode.trim())
      currentAddressErrors.zipCode = "ZIP code is required";
    if (!data.currentAddress.country.trim())
      currentAddressErrors.country = "Country is required";

    if (Object.keys(currentAddressErrors).length > 0) {
      errors.currentAddress = currentAddressErrors;
    }

    // Permanent address validation
    if (!data.sameAsCurrent) {
      const permanentAddressErrors: any = {};
      if (!data.permanentAddress.street.trim())
        permanentAddressErrors.street = "Street address is required";
      if (!data.permanentAddress.city.trim())
        permanentAddressErrors.city = "City is required";
      if (!data.permanentAddress.state.trim())
        permanentAddressErrors.state = "State is required";
      if (!data.permanentAddress.zipCode.trim())
        permanentAddressErrors.zipCode = "ZIP code is required";
      if (!data.permanentAddress.country.trim())
        permanentAddressErrors.country = "Country is required";

      if (Object.keys(permanentAddressErrors).length > 0) {
        errors.permanentAddress = permanentAddressErrors;
      }
    }

    return errors;
  };

  const validateEducation = (data: Education[]): any => {
    if (data.length === 0) {
      return { general: "At least one education record is required" };
    }

    const errors: any[] = [];
    data.forEach((edu, index) => {
      const eduErrors: any = {};
      if (!edu.degree.trim()) eduErrors.degree = "Degree is required";
      if (!edu.institution.trim())
        eduErrors.institution = "Institution is required";
      if (!edu.fieldOfStudy.trim())
        eduErrors.fieldOfStudy = "Field of study is required";
      if (!edu.graduationYear.trim())
        eduErrors.graduationYear = "Graduation year is required";
      if (!edu.percentage.trim())
        eduErrors.percentage = "Percentage/CGPA is required";

      errors[index] = eduErrors;
    });

    return errors.some((err) => Object.keys(err).length > 0) ? errors : {};
  };

  const validateExperience = (data: Experience[]): any => {
    const errors: any[] = [];
    data.forEach((exp, index) => {
      const expErrors: any = {};
      if (!exp.company.trim()) expErrors.company = "Company name is required";
      if (!exp.position.trim()) expErrors.position = "Position is required";
      if (!exp.startDate) expErrors.startDate = "Start date is required";
      if (!exp.currentJob && !exp.endDate)
        expErrors.endDate = "End date is required";
      if (!exp.responsibilities.trim())
        expErrors.responsibilities = "Responsibilities are required";

      errors[index] = expErrors;
    });

    return errors.some((err) => Object.keys(err).length > 0) ? errors : {};
  };

  const validateDocumentsAndReview = (data: ApplicationFormData): any => {
    const errors: any = {};

    if (!data.desiredPosition.trim())
      errors.desiredPosition = "Desired position is required";
    if (!data.expectedSalary.trim())
      errors.expectedSalary = "Expected salary is required";
    if (!data.noticePeriod) errors.noticePeriod = "Notice period is required";

    return errors;
  };

  const validateCurrentStage = (): boolean => {
    let stageErrors: any = {};

    switch (currentStage) {
      case 1:
        stageErrors = validatePersonalInfo(formData.personalInfo);
        break;
      case 2:
        stageErrors = validateContactDetails(formData.contactDetails);
        break;
      case 3:
        stageErrors = validateEducation(formData.education);
        break;
      case 4:
        stageErrors = validateExperience(formData.experience);
        break;
      case 5:
        stageErrors = validateDocumentsAndReview(formData);
        break;
    }

    setErrors(stageErrors);
    return Object.keys(stageErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStage()) {
      if (currentStage < 5) {
        setCurrentStage(currentStage + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handlePersonalInfoChange = useCallback((data: PersonalInfo) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }));
  }, []);

  const handleContactDetailsChange = useCallback((data: ContactDetails) => {
    setFormData((prev) => ({ ...prev, contactDetails: data }));
  }, []);

  const handleEducationChange = useCallback((data: Education[]) => {
    setFormData((prev) => ({ ...prev, education: data }));
  }, []);

  const handleExperienceChange = useCallback((data: Experience[]) => {
    setFormData((prev) => ({ ...prev, experience: data }));
  }, []);

  const handleDocumentChange = useCallback((documents: Documents) => {
    setFormData((prev) => ({ ...prev, documents }));
  }, []);

  const handleJobDetailsChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    if (!validateCurrentStage()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Application submitted successfully
      alert(
        "Application submitted successfully! We will review your application and get back to you soon."
      );

      // Reset form or redirect
      // router.push('/application-success');
    } catch (error) {
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return (
          <PersonalInfoStage
            data={formData.personalInfo}
            onChange={handlePersonalInfoChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactDetailsStage
            data={formData.contactDetails}
            onChange={handleContactDetailsChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <EducationStage
            data={formData.education}
            onChange={handleEducationChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <ExperienceStage
            data={formData.experience}
            onChange={handleExperienceChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <DocumentsReviewStage
            formData={formData}
            documents={formData.documents}
            onDocumentChange={handleDocumentChange}
            onJobDetailsChange={handleJobDetailsChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Employee Application Form
          </h1>
          <span className="mt-2 text-gray-600 dark:text-gray-400">
            Please fill out all sections to complete your application
          </span>
        </div>

        {/* Progress Stepper */}
        <Stepper stages={stages} currentStage={currentStage} />

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
          {renderCurrentStage()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStage === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-colors ${
              currentStage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          {currentStage < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center space-x-2 px-8 py-3 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <Send size={20} />
              <span>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </span>
            </button>
          )}
        </div>

        {/* Help Text */}
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact us at{' '}
            <a href="mailto:hr@company.com" className="text-blue-600 hover:text-blue-500">
              hr@company.com
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ApplicationFormPage;
