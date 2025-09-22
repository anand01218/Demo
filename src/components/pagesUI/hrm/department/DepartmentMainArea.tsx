"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React, { useState } from "react";
import DepartmentFilter from "./DepartmentFilter";
import Header from "@/components/common/Header";
import { TrashIcon, EditIcon } from "lucide-react";
import {
  useGetDepartmentListQuery,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} from "@/redux/slices/DepartmentAction";
import { toast } from "sonner";
import TableComponent from "@/components/ui/TableComponent";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";

// import TableHeader from "@/components/common/TableHeader";

// Skeleton Loader Component without animate-pulse
const DepartmentSkeleton = () => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-4 py-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" />
        </div>
      </div>

      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-600 px-4 py-4"
          style={{
            background:
              index % 2 === 0 ? "transparent" : "rgba(249, 250, 251, 0.5)", // Very light gray for alternating rows
          }}
        >
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Department Name Column */}
            <div className="flex flex-col gap-2">
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: `${Math.floor(Math.random() * 40) + 60}%`,
                  opacity: 0.7 + Math.random() * 0.3,
                }}
              />
            </div>

            {/* Description Column */}
            <div className="flex flex-col gap-1">
              <div
                className="h-3 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: `${Math.floor(Math.random() * 30) + 70}%`,
                  opacity: 0.6 + Math.random() * 0.3,
                }}
              />
              <div
                className="h-3 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: `${Math.floor(Math.random() * 50) + 30}%`,
                  opacity: 0.5 + Math.random() * 0.3,
                }}
              />
            </div>

            {/* Actions Column */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded opacity-60" />
              <div className="w-6 h-6 bg-red-200 dark:bg-red-800 rounded opacity-60" />
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center px-4 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 opacity-70" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded opacity-60"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DepartmentMainArea = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState<any>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const {
    data: departmentResponse,
    isLoading,
    refetch,
  } = useGetDepartmentListQuery({});
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const departmentList = departmentResponse?.data || departmentResponse || [];

  // Define columns for TableComponent
  interface Department {
    id: string;
    name: string;
    description: string;
    [key: string]: any;
  }

  interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    // eslint-disable-next-line no-unused-vars
    render?: (_value: any, _row: Department) => React.ReactNode;
  }

  const columns: TableColumn[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Department) => (
        <div className="flex gap-2 py-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <EditIcon size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    SmallModal.confirm({
      title: "Delete",
      content:
        "Are you sure you want to delete this department? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => handleDeleteConfirm(id),
      variant: "danger",
    });
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteDepartment(id).unwrap();
      toast.success("Department deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete department");
    }
  };

  const handleEdit = (department: any) => {
    setEditDepartment(department);
    setEditForm({ name: department.name, description: department.description });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDepartment({ id: editDepartment.id, ...editForm }).unwrap();
      toast.success("Department updated successfully!");
      setEditModalOpen(false);
      setEditDepartment(null);
      setEditForm({ name: "", description: "" });
    } catch (error) {
      toast.error("Failed to update department");
    }
  };

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between">
          <Breadcrumb breadTitle="Departments" subTitle="Home" />
          <DepartmentFilter />
        </div>
        <div className="bg-white border border-gray-200 dark:border-gray-600 shadow-sm dark:bg-gray-800">
          <div className="m-3 px-2">
            <Header title="Departments" />
          </div>
          {isLoading ? (
            <DepartmentSkeleton />
          ) : (
            <TableComponent
              data={departmentList}
              columns={columns}
              pageSize={10}
              loading={isLoading}
              emptyMessage="No departments found"
            />
          )}
        </div>
      </div>
      <SmallModal />

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Department
            </h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentMainArea;
