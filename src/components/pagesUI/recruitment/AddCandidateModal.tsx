"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { recruitmentStages } from "@/data/recruitment-data";
import ModaleCostom from "@/components/common/ModelCustom";
import * as Yup from "yup";

interface AddCandidateModalProps {
  stageId: string;
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

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ stageId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  const stageName =
    recruitmentStages.find((s) => s.id === stageId)?.name || "Unknown Stage";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      // Valid data submitted

      // Reset
      setFormData({ name: "", email: "", contact: "", resume: null });
      setErrors({});
    } catch (err: any) {
      if (err.inner) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path && !newErrors[e.path]) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
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
      setFormData((prev) => ({ ...prev, resume: e.dataTransfer.files[0] }));
    }
  };

  const reset = () => {
    setFormData({ name: "", email: "", contact: "", resume: null });
    setErrors({});
    setDragActive(false);
  };

  return (
    <ModaleCostom
      id="add-candidate-modal"
      title={`Add New Candidate (${stageName})`}
      reset={reset}
      actionButton={() => (
        <button
          form="candidateForm"
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md"
        >
          Add Candidate
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
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full name"
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
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="candidate@email.com"
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
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.contact ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1 (555) 123-4567"
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
              } ${errors.resume ? "border-red-500" : "border-gray-300"}`}
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
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <label
                    htmlFor="resume"
                    className="font-medium text-blue-600 cursor-pointer"
                  >
                    Upload a file
                  </label>
                  <span> or drag and drop</span>
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
