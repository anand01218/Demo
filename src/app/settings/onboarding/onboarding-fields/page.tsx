"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableHeader from "@/components/common/TableHeader";
import TableComponent from "@/components/ui/TableComponent";
import OnboardingFieldForm from "@/components/pagesUI/settings/onboarding/OnboardingFieldForm";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const OnboardingFieldsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const fieldsData = [
    {
      id: 1,
      fieldName: "Employee ID",
      description: "Unique identifier for each employee",
      createdBy: "John Doe",
      updatedBy: "Jane Smith",
    },
    {
      id: 2,
      fieldName: "Department",
      description: "Employee's assigned department",
      createdBy: "Mike Johnson",
      updatedBy: "Sarah Wilson",
    },
    {
      id: 3,
      fieldName: "Start Date",
      description: "Employee's first day of work",
      createdBy: "Alice Brown",
      updatedBy: "Bob Davis",
    },
  ];

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const columns = [
    { key: "fieldName", label: "Field Name", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "updatedBy", label: "Updated By", sortable: true },
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
    <>
      <MetaData pageTitle="Onboarding Fields">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb breadTitle="Onboarding Fields" subTitle="Settings" />
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Field
              </button>
            </div>
            <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 gap-2 shadow-sm border border-gray-200 dark:border-gray-600">
              <TableHeader
                title="Onboarding Fields"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search fields..."
              />
              <TableComponent
                data={fieldsData}
                columns={columns}
                pageSize={10}
                emptyMessage="No onboarding fields found"
              />
            </div>
          </div>
        </Wrapper>
      </MetaData>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-in fade-in duration-300">
          <div className="fixed right-0 top-0 h-full w-[800px] bg-white dark:bg-gray-800 shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="fixed top-0 right-0 w-[800px] flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 z-10">
              <div className=" flex items-center p-3 space-x-3">
                <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600" />
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Create Onboarding Field
                </h3>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="pt-24">
              <OnboardingFieldForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingFieldsPage;
