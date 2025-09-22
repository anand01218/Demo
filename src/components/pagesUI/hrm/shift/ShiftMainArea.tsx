"use client";
import React, { useState } from "react";
// Make sure ShiftFilter.tsx exists in the same folder as ShiftMainArea.tsx
import ShiftFilter from "@/components/pagesUI/hrm/shift/ShiftFilter";
import Link from "next/link";
import { EyeIcon, TrashIcon, EditIcon, Users } from "lucide-react";
import { toast } from "sonner";
import DeleteModal from "@/components/common/DeleteModal";
import TableComponent from "@/components/ui/TableComponent";

const ShiftMainArea = () => {
  const formatTime = (time: string) => {
    if (!time) return "N/A";
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Sample shift data
  const sampleShifts = [
    {
      id: "1",
      name: "Morning Shift",
      startTime: "09:00",
      endTime: "17:00",
      breakDuration: 60,
      employeeCount: 25,
      status: "Active",
      description: "Regular morning working hours",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Evening Shift",
      startTime: "13:00",
      endTime: "21:00",
      breakDuration: 45,
      employeeCount: 18,
      status: "Active",
      description: "Afternoon to evening shift",
      createdAt: "2024-01-10T14:15:00Z",
    },
    {
      id: "3",
      name: "Night Shift",
      startTime: "21:00",
      endTime: "05:00",
      breakDuration: 60,
      employeeCount: 12,
      status: "Active",
      description: "Night working hours with extended break",
      createdAt: "2024-01-05T09:00:00Z",
    },
    {
      id: "4",
      name: "Weekend Shift",
      startTime: "10:00",
      endTime: "18:00",
      breakDuration: 30,
      employeeCount: 8,
      status: "Inactive",
      description: "Weekend working hours",
      createdAt: "2024-01-01T11:00:00Z",
    },
  ];

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_currentPage, _setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, _setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("");

  // eslint-disable-next-line no-unused-vars
  const handleDeleteConfirm = (_id: number) => {
    // Handle delete logic here
    toast.success("Shift deleted successfully");
    setDeleteModalOpen(false);
    setDeleteId(0);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(parseInt(id));
    setDeleteModalOpen(true);
  };

  // Filter shifts based on search and status
  const filteredShifts = sampleShifts.filter((shift) => {
    const matchesSearch =
      shift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "" || shift.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "name",
      label: "Shift Name",
      sortable: true,
      render: (value: any, row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">
            {value}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {row.description}
          </span>
        </div>
      ),
    },
    {
      key: "timing",
      label: "Timing",
      render: (_: any, row: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {formatTime(row.startTime)} - {formatTime(row.endTime)}
          </span>
          <span className="text-xs text-gray-500">
            Break: {row.breakDuration} min
          </span>
        </div>
      ),
    },
    {
      key: "employeeCount",
      label: "Employees",
      render: (value: any) => (
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: any) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/shift/${row.id}`}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <Link
            href={`/shift/edit/${row.id}`}
            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
            title="Edit Shift"
          >
            <EditIcon className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDeleteClick(row.id)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title="Delete Shift"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* <Breadcrumb breadTitle="Shift Management" subTitle="Manage work shifts and schedules" /> */}

        <div className="mt-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Shift List
              </h2>
            </div>
            <Link
              href="/shift/create"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Create New Shift</span>
            </Link>
          </div>

          <div className="mt-4">
            <ShiftFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>

          <div className="mt-3">
            <TableComponent
              columns={columns}
              data={filteredShifts}
              pageSize={pageSize}
              loading={false}
              emptyMessage="No shifts found"
              pageSizeOptions={[5, 10, 15, 25, 50]}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDeleteFunc={handleDeleteConfirm}
        deleteId={deleteId}
      />
    </>
  );
};

export default ShiftMainArea;
