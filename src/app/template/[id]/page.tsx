"use client";
import Wrapper from "@/components/layouts/DefaultWrapper";
import MetaData from "@/hooks/useMetaData";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import TableHeader from "@/components/common/TableHeader";
import TableComponent from "@/components/ui/TableComponent";
import { useState } from "react";
import { Plus } from "lucide-react";
import TaskFormModal from "@/components/pagesUI/template/TaskFormModal";

function TemplateDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasksData = [
    {
      id: 1,
      taskName: "Complete IT Setup",
      assign: "John Doe",
      dueDate: "2024-01-15",
      createdBy: "HR Manager",
    },
    {
      id: 2,
      taskName: "Security Training",
      assign: "Jane Smith",
      dueDate: "2024-01-20",
      createdBy: "Security Team",
    },
    {
      id: 3,
      taskName: "Department Introduction",
      assign: "Mike Johnson",
      dueDate: "2024-01-18",
      createdBy: "Team Lead",
    },
  ];

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleAddTask = () => {
    // Handle task creation logic here
    // TODO: Implement task creation API call
    setIsModalOpen(false);
  };

  const columns = [
    { key: "taskName", label: "Task Name", sortable: true },
    { key: "assign", label: "Assign", sortable: true },
    { key: "dueDate", label: "Due Date", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
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
      <MetaData pageTitle="Onboarding Task Template">
        <Wrapper>
          <div className="app__slide-wrapper">
            <div className="flex items-center justify-between mb-2">
              <Breadcrumb
                breadTitle="Onboarding Task Template"
                subTitle="Templates"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 sm:px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 rounded-md"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
            <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 px-4 py-4 gap-2 shadow-sm border border-gray-200 dark:border-gray-600">
              <TableHeader
                title="Template Tasks"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search tasks..."
              />
              <TableComponent
                data={tasksData}
                columns={columns}
                pageSize={10}
                emptyMessage="No tasks found"
              />
            </div>
          </div>
        </Wrapper>
      </MetaData>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
}

export default TemplateDetails;
