"use client";
import { useState } from "react";

interface FieldSection {
  title: string;
  fields: string[];
}

const OnboardingFieldForm = () => {
  const sections: FieldSection[] = [
    {
      title: "Email & Welcome Letter",
      fields: ["Email", "Welcome Letter"],
    },
    {
      title: "About Company",
      fields: ["Company Overview", "Company Vision", "Company Mission"],
    },
    {
      title: "Employee’s First Day, When & Where",
      fields: [
        "Joining Date",
        "Hiring Manager",
        "Time",
        "Need Help",
        "Address",
        "Who to Contact",
        "Offer Letter",
        "Appointment Letter",
      ],
    },
    {
      title: "Personal Information",
      fields: [
        "Company Name",
        "Legal Entity Company",
        "Employee ID",
        "Unique ID",
        "Display Name",
        "First Name",
        "Middle Name",
        "Last Name",
        "Gender",
        "Marital Status",
        "Date of Birth",
        "Blood Group",
      ],
    },
    {
      title: "Contact Information",
      fields: ["Mobile Number", "Email"],
    },
    {
      title: "Social Links",
      fields: ["LinkedIn URL", "Github URL", "Leetcode URL", "Portfolio URL"],
    },
    {
      title: "Address",
      fields: [
        "Address 1",
        "Address 2",
        "City",
        "State",
        "Country",
        "Post Code",
      ],
    },
    {
      title: "Personal Documents",
      fields: ["Employee Documents"],
    },
    {
      title: "Family Information",
      fields: ["Relationship", "Name", "Date of Birth", "Occupation"],
    },
    {
      title: "Emergency Contact",
      fields: [
        "Name",
        "Relation",
        "Mobile Number",
        "Home Phone Number",
        "Email",
        "Address 1",
        "Address 2",
        "City",
        "State",
        "Country",
        "Post Code",
      ],
    },
    {
      title: "Education Details",
      fields: [
        "Degree",
        "College/University Name",
        "Specialization",
        "Start Month & Year",
      ],
    },
    {
      title: "Previous Employment",
      fields: ["Total Experience", "Company Name", "Department", "Job Title"],
    },
    {
      title: "Job Information",
      fields: [
        "Location",
        "Sub Location",
        "Job Title",
        "Category",
        "Department",
        "Sub Department",
        "Reporting Manager",
        "Employee Status",
        "Joining Date",
      ],
    },
    {
      title: "Compensation",
      fields: [
        "Salary",
        "Pay Frequency",
        "Start Date",
        "End Date",
        "Period (in Month)",
        "Notice Period (in Days)",
        "Notify Period (in Days)",
        "Bonus Type",
        "Month Bonus",
        "Bonus Range",
        "Salary Mode",
        "Tax Regime",
      ],
    },
    {
      title: "Policy",
      fields: [
        "Shift Policy",
        "Overtime Policy",
        "Leave Policy",
        "Salary Template Policy",
        "Comp-Off Policy",
        "Holiday Policy",
        "Clock In Policy",
      ],
    },
    {
      title: "Salary Breakup",
      fields: ["Salary Information"],
    },
    {
      title: "Organization Structure",
      fields: [
        "Business Unit",
        "Cost Center",
        "Bands",
        "Hub",
        "Territory",
        "Segment",
        "Region",
        "Grade",
      ],
    },
  ];

  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [fieldName, setFieldName] = useState("");
  const [description, setDescription] = useState("");

  const handleFieldChange = (field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectAll = (sectionFields: string[]) => {
    const allSelected = sectionFields.every((field) => selectedFields[field]);
    const updates: Record<string, boolean> = {};
    sectionFields.forEach((field) => {
      updates[field] = !allSelected;
    });
    setSelectedFields((prev) => ({ ...prev, ...updates }));
  };

  const isSectionAllSelected = (sectionFields: string[]) => {
    return sectionFields.every((field) => selectedFields[field]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Field Name *
            </label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter field name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter field description"
            />
          </div>
        </div>
        {sections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSectionAllSelected(section.fields)}
                  onChange={() => handleSelectAll(section.fields)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select All
                </span>
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {section.fields.map((field, fieldIndex) => (
                <label
                  key={fieldIndex}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFields[field] || false}
                    onChange={() => handleFieldChange(field)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {field}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className=" flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Fields
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingFieldForm;
