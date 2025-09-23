"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import ModaleCostom from "@/components/common/ModelCustom";
import * as Yup from "yup";
import { toast } from "sonner";
import { useGetRecruitmentStageQuery } from "@/redux/slices/recruitmentAction";
import { candidateDataService } from "@/data/recruitment/candidate-data";

interface AddCandidateModalProps {
  stageId?: string;
  onCandidateAdded?: () => void; // Callback to refresh parent component
}

const schema = Yup.object().shape({
  name: Yup.string().required("Candidate name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string()
    .matches(/^\+?[0-9\s\-()]{7,15}$/, "Enter a valid phone number")
    .required("Contact number is required"),
  resume: Yup.mixed<File>()
    .required("Resume is required")
    .test("fileSize", "File size must be less than 10MB", (file) =>
      file ? file.size <= 10 * 1024 * 1024 : false
    )
    .test("fileType", "Only PDF, DOC, DOCX files are allowed", (file) =>
      file
        ? [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        : false
    ),
});

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({
  stageId,
  onCandidateAdded,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: stages, isLoading } = useGetRecruitmentStageQuery(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrors({});

      // Validate form data
      await schema.validate(formData, { abortEarly: false });

      // Check if we have stages data
      if (!stages || stages.length === 0) {
        toast.error("No recruitment stages found. Please create stages first.");
        return;
      }

      // Determine which stage to use
      const targetStageId = stageId || stages[0].id;

      // Create new candidate object
      const newCandidate = {
        id: `candidate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contact: formData.contact.trim(),
        stageId: targetStageId,
        appliedDate: new Date().toISOString(),
        resumeUrl: formData.resume
          ? URL.createObjectURL(formData.resume)
          : undefined,
        notes: [],
        // Add any other required fields from your interface
      };

      // Add candidate to service
      candidateDataService.addCandidate(newCandidate);

      // Show success message
      toast.success(`Candidate "${formData.name}" added successfully!`);

      // Reset form
      resetForm();

      // Notify parent component
      if (onCandidateAdded) {
        onCandidateAdded();
      }

      // Close modal (you might need to trigger this differently based on your modal implementation)
      const modalElement = document.getElementById("add-candidate-modal");
      if (modalElement) {
        modalElement.click(); // This might close the modal, adjust as needed
      }
    } catch (err: any) {
      // console.error("Error adding candidate:", err);

      if (err.inner) {
        // Yup validation errors
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path && !newErrors[e.path]) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the form errors before submitting.");
      } else {
        toast.error("Failed to add candidate. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));

    // Clear resume error when file is selected
    if (errors.resume && file) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({ ...prev, resume: file }));

      // Clear resume error when file is dropped
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", contact: "", resume: null });
    setErrors({});
    setDragActive(false);
  };

  return (
    <ModaleCostom
      id="add-candidate-modal"
      title={`Add New Candidate`}
      reset={resetForm}
      actionButton={() => (
        <button
          form="candidateForm"
          type="submit"
          disabled={isSubmitting || isLoading}
          className="px-4 py-2 bg-blue-600 transition-color hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            "Add Candidate"
          )}
        </button>
      )}
    >
      <form onSubmit={handleSubmit} className="p-6" id="candidateForm">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Candidate Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="candidate@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                errors.contact
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Resume */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Resume Upload *
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                dragActive ? "border-blue-500 bg-blue-50 scale-105" : ""
              } ${errors.resume ? "border-red-500" : "border-gray-300"} ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={isSubmitting}
              />

              {formData.resume ? (
                <div className="text-sm">
                  <p className="text-green-600 font-medium">
                    {formData.resume.name}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, resume: null }))
                    }
                    className="text-red-500 hover:text-red-700 mt-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <label
                    htmlFor="resume"
                    className="font-medium text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    Upload a file
                  </label>
                  <span> or drag and drop</span>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              )}
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>
        </div>
      </form>
    </ModaleCostom>
  );
};

export default AddCandidateModal;
