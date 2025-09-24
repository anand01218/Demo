"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableHeader from "@/components/common/TableHeader";
import TableComponent from "@/components/ui/TableComponent";
import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import TemplateFormModal from "@/components/pagesUI/settings/onboarding/TemplateFormModal";

const OnboardingTemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const templatesData = [
    {
      id: 1,
      templateName: "Software Developer Onboarding",
      subject: "Welcome to the Dev Team",
      description: "Complete onboarding process for software developers",
    },
    {
      id: 2,
      templateName: "HR Manager Onboarding",
      subject: "HR Onboarding Process",
      description: "Onboarding template for HR management positions",
    },
    {
      id: 3,
      templateName: "Sales Executive Onboarding",
      subject: "Sales Team Introduction",
      description: "Comprehensive onboarding for sales team members",
    },
  ];

  const handleAddTemplate = () => {
    // Handle template creation logic here
    // TODO: Implement template creation API call
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "templateName",
      label: "Template Title",
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
    { key: "subject", label: "Subject", sortable: true },
    { key: "description", label: "Description", sortable: true },
    {
      key: "action",
      label: "Action",
      render: () => (
        <div className="py-2 relative">
          <button
            onClick={() => {
              /* Handle edit template */
            }}
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              /* Handle delete template */
            }}
            className="text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-100 ml-4"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <MetaData pageTitle="Mail-Templates">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb breadTitle="Mail Templates" subTitle="Settings" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 sm:px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 rounded-md"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Template</span>
              </button>
            </div>
            <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 gap-2 shadow-sm border border-gray-200 dark:border-gray-600">
              <TableHeader
                title="Mail-Templates"
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
