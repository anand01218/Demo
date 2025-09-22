"use client";
import React, { useState } from "react";
import TableComponent from "@/components/ui/TableComponent";
import DashboardHeader from "@/components/common/DashboardHeader";

const Recentleave = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample leave requests data
  const leaveRequests = [
    {
      id: 1,
      name: "John Doe",
      date: "Dec 15-17, 2024",
      type: "Sick Leave",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "Dec 20-25, 2024",
      type: "Annual Leave",
      status: "Approved",
    },
    {
      id: 3,
      name: "Mike Johnson",
      date: "Dec 18-19, 2024",
      type: "Emergency",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      date: "Dec 22-24, 2024",
      type: "Personal",
      status: "Approved",
    },
    {
      id: 5,
      name: "David Brown",
      date: "Dec 28-30, 2024",
      type: "Vacation",
      status: "Pending",
    },
  ];

  // Define columns for TableComponent
  const columns = [
    {
      key: "name",
      label: "Employee",
      render: (value: any, row: any) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
            {row.name}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value: any) => (
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: any) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "Approved":
              return "bg-green-100 rounded-full font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Rejected":
              return "bg-red-100 rounded-full font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Pending":
              return "bg-orange-100 rounded-full font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
            case "Under Review":
              return "bg-blue-100 rounded-full font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default:
              return "bg-gray-100 rounded-full font-semibold text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
          }
        };

        return (
          <span
            className={`px-2 py-1 text-xs whitespace-nowrap ${getStatusColor(value)}`}
          >
            {value}
          </span>
        );
      },
    },
  ];
  return (
    <>
      <div className="w-full">
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
            <DashboardHeader
              title="Recent Leave Requests"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search leave requests..."
            />
          </div>
          <TableComponent
            data={leaveRequests}
            columns={columns}
            pageSize={10}
            loading={false}
            height="330px"
            emptyMessage="No leave requests found"
            showPaginationControls={false}
            className="rounded-none border-0"
          />
        </div>
      </div>
    </>
  );
};

export default Recentleave;
