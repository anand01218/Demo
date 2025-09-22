"use client";
import React from "react";
import { PersonalInfo } from "@/interface/applicationForm.interface";

interface PersonalInfoStageProps {
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  data: PersonalInfo;
  // eslint-disable-next-line no-unused-vars -- keep param name for clarity
  onChange: (data: PersonalInfo) => void;
  errors: Partial<PersonalInfo>;
}

const PersonalInfoStage: React.FC<PersonalInfoStageProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.firstName
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.lastName
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.dateOfBirth
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender *
          </label>
          <select
            value={data.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.gender
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nationality *
          </label>
          <input
            type="text"
            value={data.nationality}
            onChange={(e) => handleChange("nationality", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.nationality
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter your nationality"
          />
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Marital Status *
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.maritalStatus
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.maritalStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.maritalStatus}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Blood Group
          </label>
          <input
            type="text"
            value={data.bloodGroup}
            onChange={(e) => handleChange("bloodGroup", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="e.g., A+, B-, O+"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emergency Contact Name *
          </label>
          <input
            type="text"
            value={data.emergencyContactName}
            onChange={(e) =>
              handleChange("emergencyContactName", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.emergencyContactName
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Emergency contact name"
          />
          {errors.emergencyContactName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.emergencyContactName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emergency Contact Phone *
          </label>
          <input
            type="tel"
            value={data.emergencyContactPhone}
            onChange={(e) =>
              handleChange("emergencyContactPhone", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
              errors.emergencyContactPhone
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Emergency contact phone"
          />
          {errors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.emergencyContactPhone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Emergency Contact Relation *
        </label>
        <input
          type="text"
          value={data.emergencyContactRelation}
          onChange={(e) =>
            handleChange("emergencyContactRelation", e.target.value)
          }
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 ${
            errors.emergencyContactRelation
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="e.g., Father, Mother, Spouse, Sibling"
        />
        {errors.emergencyContactRelation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.emergencyContactRelation}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoStage;
