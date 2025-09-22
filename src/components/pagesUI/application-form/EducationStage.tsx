"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/interface/applicationForm.interface";

interface EducationStageProps {
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  data: Education[];
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  onChange: (data: Education[]) => void;
  errors: any;
}

const EducationStage: React.FC<EducationStageProps> = ({
  data,
  onChange,
  errors,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      fieldOfStudy: "",
      graduationYear: "",
      percentage: "",
      certification: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const getEducationError = (index: number) => {
    return errors && Array.isArray(errors) ? errors[index] : {};
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Educational Background
        </h3>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">
            No education records added yet. Click &quot;Add Education&quot; to
            get started.
          </p>
        </div>
      )}

      {data.map((education, index) => {
        const educationErrors = getEducationError(index);

        return (
          <div
            key={education.id}
            className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                Education #{index + 1}
              </h4>
              {data.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(education.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Degree/Qualification *
                </label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    educationErrors.degree
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="e.g., Bachelor of Science"
                />
                {educationErrors.degree && (
                  <p className="mt-1 text-sm text-red-600">
                    {educationErrors.degree}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(education.id, "institution", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    educationErrors.institution
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="University/College name"
                />
                {educationErrors.institution && (
                  <p className="mt-1 text-sm text-red-600">
                    {educationErrors.institution}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={education.fieldOfStudy}
                  onChange={(e) =>
                    updateEducation(
                      education.id,
                      "fieldOfStudy",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    educationErrors.fieldOfStudy
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="e.g., Computer Science"
                />
                {educationErrors.fieldOfStudy && (
                  <p className="mt-1 text-sm text-red-600">
                    {educationErrors.fieldOfStudy}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Graduation Year *
                </label>
                <input
                  type="number"
                  min="1950"
                  max="2030"
                  value={education.graduationYear}
                  onChange={(e) =>
                    updateEducation(
                      education.id,
                      "graduationYear",
                      e.target.value
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    educationErrors.graduationYear
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="2023"
                />
                {educationErrors.graduationYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {educationErrors.graduationYear}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentage/CGPA *
                </label>
                <input
                  type="text"
                  value={education.percentage}
                  onChange={(e) =>
                    updateEducation(education.id, "percentage", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    educationErrors.percentage
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="85% or 8.5 CGPA"
                />
                {educationErrors.percentage && (
                  <p className="mt-1 text-sm text-red-600">
                    {educationErrors.percentage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certification/Honors (Optional)
                </label>
                <input
                  type="text"
                  value={education.certification || ""}
                  onChange={(e) =>
                    updateEducation(
                      education.id,
                      "certification",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., Summa Cum Laude, Dean's List"
                />
              </div>
            </div>
          </div>
        );
      })}

      {data.length === 0 && (
        <button
          type="button"
          onClick={addEducation}
          className="w-full py-3 px-4 border-2 border-dashed border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <Plus size={20} className="mx-auto mb-2" />
          Add Your First Education Record
        </button>
      )}
    </div>
  );
};

export default EducationStage;
