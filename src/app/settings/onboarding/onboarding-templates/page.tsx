"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableHeader from "@/components/common/TableHeader";
import TableComponent from "@/components/ui/TableComponent";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import TemplateFormModal from "@/components/pagesUI/settings/onboarding/TemplateFormModal";

const OnboardingTemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const templatesData = [
    {
      id: 1,
      templateName: "Software Developer Onboarding",
      totalTask: 12,
      description: "Complete onboarding process for software developers",
      createdBy: "John Doe",
      updatedBy: "Jane Smith",
    },
    {
      id: 2,
      templateName: "HR Manager Onboarding",
      totalTask: 8,
      description: "Onboarding template for HR management positions",
      createdBy: "Mike Johnson",
      updatedBy: "Sarah Wilson",
    },
    {
      id: 3,
      templateName: "Sales Executive Onboarding",
      totalTask: 10,
      description: "Comprehensive onboarding for sales team members",
      createdBy: "Alice Brown",
      updatedBy: "Bob Davis",
    },
  ];

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleAddTemplate = () => {
    // Handle template creation logic here
    // TODO: Implement template creation API call
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "templateName",
      label: "Template Name",
      sortable: true,
      render: (value: string, row: any) => (
        <button
          onClick={() => router.push(`/template/${row.id}`)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline"
        >
          {value}
        </button>
      ),
    },
    {
      key: "totalTask",
      label: "Total Task",
      sortable: true,
      render: (value: number) => (
        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
          {value}
        </span>
      ),
    },
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
      <MetaData pageTitle="Onboarding Templates">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb
                breadTitle="Onboarding Templates"
                subTitle="Settings"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 sm:px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 rounded-md"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Template</span>
              </button>
            </div>
            <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 px-4 py-4 gap-2 shadow-sm border border-gray-200 dark:border-gray-600">
              <TableHeader
                title="Onboarding Templates"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search templates..."
              />
              <TableComponent
                data={templatesData}
                columns={columns}
                pageSize={10}
                emptyMessage="No onboarding templates found"
              />
            </div>
          </div>
        </Wrapper>
      </MetaData>

      <TemplateFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTemplate}
      />
    </>
  );
};

export default OnboardingTemplatesPage;
