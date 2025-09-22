"use client";
import React, { useState, useMemo } from "react";
import TableComponent from "@/components/ui/TableComponent";
import DashboardHeader from "@/components/common/DashboardHeader";
import { useGetUsersQuery } from "@/redux/slices/DashboardAction";
import { EyeIcon, Edit2Icon, Trash2Icon } from "lucide-react";

const Users = () => {
  const { data: usersResponse, isLoading } = useGetUsersQuery({});
  const [searchTerm, setSearchTerm] = useState("");

  // Extract users data from response with memoization
  const usersData = useMemo(() => {
    return usersResponse?.data || [];
  }, [usersResponse?.data]);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!usersData.length) return [];
    if (!searchTerm) return usersData;

    return usersData.filter((user: any) => {
      const fullName =
        `${user.employee?.firstName || ""} ${user.employee?.lastName || ""}`.toLowerCase();
      const email = user.email?.toLowerCase() || "";
      const employeeId = user.employee?.employeeId?.toLowerCase() || "";
      const searchLower = searchTerm.toLowerCase();

      return (
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        employeeId.includes(searchLower)
      );
    });
  }, [usersData, searchTerm]);

  // Define table columns
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      // eslint-disable-next-line no-unused-vars
      render: (value: any, row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">
            {`${row.employee?.firstName || ""} ${row.employee?.lastName || ""}`.trim() ||
              "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      // eslint-disable-next-line no-unused-vars
      render: (value: any, row: any) => (
        <span className="text-gray-900 dark:text-white">{row.email}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      // eslint-disable-next-line no-unused-vars
      render: (value: any, row: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            row.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      // eslint-disable-next-line no-unused-vars
      render: (value: any, row: any) => (
        <div className="flex gap-2 py-2">
          <button
            onClick={() => handleView(row)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="View"
          >
            <EyeIcon size={16} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            title="Edit"
          >
            <Edit2Icon size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Action handlers
  // eslint-disable-next-line no-unused-vars
  const handleView = (_user: any) => {
    // Implement view logic
  };

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (_user: any) => {
    // Implement edit logic
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (_user: any) => {
    // Implement delete logic
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 no-height">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <DashboardHeader
          title="All Users"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search users..."
        />
      </div>
      <TableComponent
        data={filteredUsers}
        columns={columns}
        loading={isLoading}
        pageSize={10}
        emptyMessage="No users found"
        height="400px"
        showPaginationControls={false}
        className="rounded-none border-0"
      />
    </div>
  );
};

export default Users;
