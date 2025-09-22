"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "@/interface/applicationForm.interface";

interface ExperienceStageProps {
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  data: Experience[];
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  onChange: (data: Experience[]) => void;
  errors: any;
}

const ExperienceStage: React.FC<ExperienceStageProps> = ({
  data,
  onChange,
  errors,
}) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      responsibilities: "",
      salary: "",
      reasonForLeaving: "",
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const getExperienceError = (index: number) => {
    return errors && Array.isArray(errors) ? errors[index] : {};
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Work Experience
        </h3>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No work experience added yet.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            You can skip this section if you&apos;re a fresh graduate or add
            your work experience below.
          </p>
        </div>
      )}

      {data.map((experience, index) => {
        const experienceErrors = getExperienceError(index);

        return (
          <div
            key={experience.id}
            className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                Experience #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    experienceErrors.company
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Company name"
                />
                {experienceErrors.company && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceErrors.company}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position/Job Title *
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(experience.id, "position", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    experienceErrors.position
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Your job title"
                />
                {experienceErrors.position && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceErrors.position}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    experienceErrors.startDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {experienceErrors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceErrors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date {!experience.currentJob && "*"}
                </label>
                <input
                  type="date"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                  disabled={experience.currentJob}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    experience.currentJob ? "bg-gray-100 dark:bg-gray-600" : ""
                  } ${
                    experienceErrors.endDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {experienceErrors.endDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceErrors.endDate}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    checked={experience.currentJob}
                    onChange={(e) => {
                      updateExperience(
                        experience.id,
                        "currentJob",
                        e.target.checked
                      );
                      if (e.target.checked) {
                        updateExperience(experience.id, "endDate", "");
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    This is my current job
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  value={experience.salary}
                  onChange={(e) =>
                    updateExperience(experience.id, "salary", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="e.g., $50,000 per year"
                />
              </div>

              {!experience.currentJob && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Leaving
                  </label>
                  <input
                    type="text"
                    value={experience.reasonForLeaving || ""}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "reasonForLeaving",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                    placeholder="Reason for leaving"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Responsibilities *
                </label>
                <textarea
                  value={experience.responsibilities}
                  onChange={(e) =>
                    updateExperience(
                      experience.id,
                      "responsibilities",
                      e.target.value
                    )
                  }
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
                    experienceErrors.responsibilities
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Describe your key responsibilities and achievements in this role..."
                />
                {experienceErrors.responsibilities && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceErrors.responsibilities}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {data.length === 0 && (
        <button
          type="button"
          onClick={addExperience}
          className="w-full py-3 px-4 border-2 border-dashed border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <Plus size={20} className="mx-auto mb-2" />
          Add Your Work Experience
        </button>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Fresh Graduate?</strong> If you don&apos;t have work
          experience, you can skip this section or add internships, volunteer
          work, or project experiences that are relevant.
        </p>
      </div>
    </div>
  );
};

export default ExperienceStage;
