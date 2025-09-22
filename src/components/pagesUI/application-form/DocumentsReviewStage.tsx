"use client";
import React from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import {
  ApplicationFormData,
  Documents,
} from "@/interface/applicationForm.interface";

interface DocumentsReviewStageProps {
  formData: ApplicationFormData;
  // eslint-disable-next-line no-unused-vars -- keep named param for clarity
  documents: Documents;
  // eslint-disable-next-line no-unused-vars -- keep named param for clarity
  onDocumentChange: (documents: Documents) => void;
  // eslint-disable-next-line no-unused-vars -- keep named params for clarity
  onJobDetailsChange: (field: string, value: string) => void;
  errors: any;
}

const DocumentsReviewStage: React.FC<DocumentsReviewStageProps> = ({
  formData,
  documents,
  onDocumentChange,
  onJobDetailsChange,
  errors,
}) => {
  const handleFileChange = (field: keyof Documents, file: File | null) => {
    onDocumentChange({ ...documents, [field]: file });
  };

  const handleMultipleFileChange = (
    field: keyof Documents,
    files: FileList | null
  ) => {
    if (files) {
      const fileArray = Array.from(files);
      onDocumentChange({ ...documents, [field]: fileArray });
    }
  };

  const FileUpload = ({
    label,
    field,
    accept,
    multiple = false,
    required = false,
  }: {
    label: string;
    field: keyof Documents;
    accept: string;
    multiple?: boolean;
    required?: boolean;
  }) => {
    const currentFile = documents[field];
    const hasFile = multiple
      ? Array.isArray(currentFile) && currentFile.length > 0
      : currentFile instanceof File;

    return (
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                {label} {required && <span className="text-red-500">*</span>}
              </span>
              <input
                type="file"
                className="sr-only"
                accept={accept}
                multiple={multiple}
                onChange={(e) => {
                  if (multiple) {
                    handleMultipleFileChange(field, e.target.files);
                  } else {
                    handleFileChange(field, e.target.files?.[0] || null);
                  }
                }}
              />
              <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                {accept.includes("image")
                  ? "PNG, JPG, JPEG up to 2MB"
                  : "PDF up to 5MB"}
              </span>
            </label>
          </div>
          {hasFile && (
            <div className="mt-2 flex items-center justify-center text-green-600">
              <Check size={16} className="mr-1" />
              <span className="text-sm">
                {multiple
                  ? `${(currentFile as File[]).length} file(s) selected`
                  : (currentFile as File).name}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ValidationSummary = () => {
    const personalInfoComplete =
      formData.personalInfo.firstName &&
      formData.personalInfo.lastName &&
      formData.personalInfo.dateOfBirth &&
      formData.personalInfo.gender &&
      formData.personalInfo.nationality &&
      formData.personalInfo.maritalStatus;

    const contactDetailsComplete =
      formData.contactDetails.email &&
      formData.contactDetails.phone &&
      formData.contactDetails.currentAddress.street &&
      formData.contactDetails.currentAddress.city &&
      formData.contactDetails.currentAddress.state &&
      formData.contactDetails.permanentAddress.street;

    const educationComplete = formData.education.length > 0;
    const hasRequiredDocuments = documents.resume && documents.photo;

    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Application Checklist
        </h4>
        <div className="space-y-2">
          <div className="flex items-center">
            {personalInfoComplete ? (
              <Check className="text-green-500 mr-2" size={16} />
            ) : (
              <AlertCircle className="text-red-500 mr-2" size={16} />
            )}
            <span
              className={
                personalInfoComplete
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }
            >
              Personal Information
            </span>
          </div>
          <div className="flex items-center">
            {contactDetailsComplete ? (
              <Check className="text-green-500 mr-2" size={16} />
            ) : (
              <AlertCircle className="text-red-500 mr-2" size={16} />
            )}
            <span
              className={
                contactDetailsComplete
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }
            >
              Contact Details
            </span>
          </div>
          <div className="flex items-center">
            {educationComplete ? (
              <Check className="text-green-500 mr-2" size={16} />
            ) : (
              <AlertCircle className="text-red-500 mr-2" size={16} />
            )}
            <span
              className={
                educationComplete
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }
            >
              Education Background
            </span>
          </div>
          <div className="flex items-center">
            {hasRequiredDocuments ? (
              <Check className="text-green-500 mr-2" size={16} />
            ) : (
              <AlertCircle className="text-red-500 mr-2" size={16} />
            )}
            <span
              className={
                hasRequiredDocuments
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }
            >
              Required Documents (Resume & Photo)
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Job Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Job Application Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Desired Position *
            </label>
            <input
              type="text"
              value={formData.desiredPosition}
              onChange={(e) =>
                onJobDetailsChange("desiredPosition", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.desiredPosition
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Software Engineer, Marketing Manager, etc."
            />
            {errors.desiredPosition && (
              <p className="mt-1 text-sm text-red-600">
                {errors.desiredPosition}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expected Salary *
            </label>
            <input
              type="text"
              value={formData.expectedSalary}
              onChange={(e) =>
                onJobDetailsChange("expectedSalary", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.expectedSalary
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="$60,000 per year"
            />
            {errors.expectedSalary && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expectedSalary}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notice Period *
            </label>
            <select
              value={formData.noticePeriod}
              onChange={(e) =>
                onJobDetailsChange("noticePeriod", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                errors.noticePeriod
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">Select Notice Period</option>
              <option value="Immediate">Immediate</option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
            </select>
            {errors.noticePeriod && (
              <p className="mt-1 text-sm text-red-600">{errors.noticePeriod}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            value={formData.additionalComments}
            onChange={(e) =>
              onJobDetailsChange("additionalComments", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Any additional information you'd like to share..."
          />
        </div>
      </div>

      {/* Document Upload */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Document Upload
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Resume/CV"
            field="resume"
            accept=".pdf,.doc,.docx"
            required
          />
          <FileUpload
            label="Profile Photo"
            field="photo"
            accept="image/*"
            required
          />
          <FileUpload
            label="Aadhar Card"
            field="aadharCard"
            accept=".pdf,image/*"
          />
          <FileUpload label="PAN Card" field="panCard" accept=".pdf,image/*" />
          <FileUpload
            label="Education Certificates"
            field="educationCertificates"
            accept=".pdf,image/*"
            multiple
          />
          <FileUpload
            label="Experience Certificates"
            field="experienceCertificates"
            accept=".pdf,image/*"
            multiple
          />
        </div>
      </div>

      {/* Validation Summary */}
      <ValidationSummary />

      {/* Review Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Application Summary
        </h3>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Personal Information
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.personalInfo.firstName} {formData.personalInfo.lastName}{" "}
              |{formData.personalInfo.gender} |{" "}
              {formData.personalInfo.nationality}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Contact
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.contactDetails.email} | {formData.contactDetails.phone}
            </p>
          </div>

          {formData.education.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Education
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.education.length} education record(s) added
              </p>
            </div>
          )}

          {formData.experience.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Experience
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.experience.length} work experience record(s) added
              </p>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Position Applied
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.desiredPosition || "Not specified"} | Expected Salary:{" "}
              {formData.expectedSalary || "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsReviewStage;
