"use client";
import TableComponent from "@/components/ui/TableComponent";
import { useState } from "react";

const DesignationTable = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const designationData = [
    {
      id: 1,
      name: "Software Engineer",
      description: "Develops and maintains software applications",
      totalEmployees: 25,
    },
    {
      id: 2,
      name: "Senior Developer",
      description: "Lead developer with advanced technical skills",
      totalEmployees: 12,
    },
    {
      id: 3,
      name: "Project Manager",
      description: "Manages project timelines and team coordination",
      totalEmployees: 8,
    },
    {
      id: 4,
      name: "UI/UX Designer",
      description: "Designs user interfaces and user experiences",
      totalEmployees: 6,
    },
    {
      id: 5,
      name: "HR Manager",
      description: "Handles human resources and employee relations",
      totalEmployees: 3,
    },
  ];

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description", sortable: true },
    {
      key: "totalEmployees",
      label: "Total Employees",
      sortable: true,
      render: (value: number) => (
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (value: any, row: any) => (
        <div className="relative">
          <button
            onClick={() => toggleDropdown(row.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <i className="fa-solid fa-ellipsis-vertical text-gray-600 dark:text-gray-400" />
          </button>
          {dropdownOpen === row.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2">
                <i className="fa-solid fa-edit text-blue-500" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2">
                <i className="fa-solid fa-trash text-red-500" />
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <TableComponent
      data={designationData}
      columns={columns}
      pageSize={10}
      emptyMessage="No designations found"
    />
  );
};

export default DesignationTable;
