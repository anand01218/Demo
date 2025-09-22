"use client";
import React, { useState } from "react";
import Link from "next/link";
import { EyeIcon, TrashIcon, UserPlus, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";
import DeleteModal from "@/components/common/DeleteModal";
import TableComponent from "@/components/ui/TableComponent";
import SummarySingleCard from "@/components/common/SummarySingleCard";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
}

interface ShiftAssignment {
  id: string;
  employee: Employee;
  shiftName: string;
  startDate: string;
  endDate?: string;
  status: "Active" | "Inactive" | "Scheduled";
  assignedBy: string;
  assignedDate: string;
}

const ShiftAssignmentsMainArea = () => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Sample shift assignments data
  const sampleAssignments: ShiftAssignment[] = [
    {
      id: "1",
      employee: {
        id: "emp001",
        name: "John Doe",
        email: "john.doe@company.com",
        department: "Development",
        designation: "Senior Developer",
      },
      shiftName: "Morning Shift",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "Active",
      assignedBy: "HR Manager",
      assignedDate: "2024-01-10",
    },
    {
      id: "2",
      employee: {
        id: "emp002",
        name: "Jane Smith",
        email: "jane.smith@company.com",
        department: "Design",
        designation: "UI/UX Designer",
      },
      shiftName: "Evening Shift",
      startDate: "2024-01-20",
      endDate: "2024-06-30",
      status: "Active",
      assignedBy: "Team Lead",
      assignedDate: "2024-01-15",
    },
    {
      id: "3",
      employee: {
        id: "emp003",
        name: "Mike Johnson",
        email: "mike.johnson@company.com",
        department: "Security",
        designation: "Security Officer",
      },
      shiftName: "Night Shift",
      startDate: "2024-02-01",
      status: "Scheduled",
      assignedBy: "Security Head",
      assignedDate: "2024-01-25",
    },
    {
      id: "4",
      employee: {
        id: "emp004",
        name: "Sarah Wilson",
        email: "sarah.wilson@company.com",
        department: "Marketing",
        designation: "Marketing Specialist",
      },
      shiftName: "Morning Shift",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "Inactive",
      assignedBy: "Marketing Head",
      assignedDate: "2023-12-25",
    },
  ];

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // eslint-disable-next-line no-unused-vars
  const handleDeleteConfirm = (_id: number) => {
    // Handle delete logic here
    toast.success("Shift assignment removed successfully");
    setDeleteModalOpen(false);
    setDeleteId(0);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(parseInt(id));
    setDeleteModalOpen(true);
  };

  // Filter assignments based on search and filters
  const filteredAssignments = sampleAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assignment.employee.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assignment.shiftName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesShift =
      selectedShift === "" || assignment.shiftName === selectedShift;
    const matchesStatus =
      selectedStatus === "" || assignment.status === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "" ||
      assignment.employee.department === selectedDepartment;

    return matchesSearch && matchesShift && matchesStatus && matchesDepartment;
  });

  const uniqueShifts = Array.from(
    new Set(sampleAssignments.map((a) => a.shiftName))
  );
  const uniqueDepartments = Array.from(
    new Set(sampleAssignments.map((a) => a.employee.department))
  );

  const columns = [
    {
      key: "employee",
      label: "Employee",
      sortable: true,
      render: (value: any, row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">
            {row.employee.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {row.employee.email}
          </span>
          <span className="text-xs text-blue-600 dark:text-blue-400">
            {row.employee.department} - {row.employee.designation}
          </span>
        </div>
      ),
    },
    {
      key: "shiftName",
      label: "Shift",
      render: (value: any) => (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      render: (_: any, row: any) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1 text-sm">
            <Calendar className="w-3 h-3 text-green-500" />
            <span>Start: {formatDate(row.startDate)}</span>
          </div>
          {row.endDate && (
            <div className="flex items-center space-x-1 text-sm">
              <Calendar className="w-3 h-3 text-red-500" />
              <span>End: {formatDate(row.endDate)}</span>
            </div>
          )}
          {!row.endDate && (
            <span className="text-xs text-gray-500">Ongoing</span>
          )}
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
              : value === "Scheduled"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "assignedInfo",
      label: "Assignment Info",
      render: (_: any, row: any) => (
        <div className="flex flex-col text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            By: {row.assignedBy}
          </span>
          <span className="text-xs text-gray-500">
            On: {formatDate(row.assignedDate)}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/shift/assignments/${row.id}`}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDeleteClick(row.id)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title="Remove Assignment"
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-[2px] h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Shift Assignments
            </h1>
          </div>
          <Link
            href="/shift/assignments/create"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Assign Shift</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-6">
          <SummarySingleCard
            iconClass="fa-sharp fa-regular fa-users"
            title="Total Assignments"
            value={sampleAssignments.length}
            description=""
            percentageChange=""
            isIncrease={true}
          />

          <SummarySingleCard
            iconClass="fa-light fa-badge-check"
            title="Active"
            value={
              sampleAssignments.filter((a) => a.status === "Active").length
            }
            description=""
            percentageChange=""
            isIncrease={true}
          />

          <SummarySingleCard
            iconClass="fa-sharp fa-regular fa-clock"
            title="Scheduled"
            value={
              sampleAssignments.filter((a) => a.status === "Scheduled").length
            }
            description=""
            percentageChange=""
            isIncrease={true}
          />

          <SummarySingleCard
            iconClass="fa-sharp fa-regular fa-ban"
            title="Inactive"
            value={
              sampleAssignments.filter((a) => a.status === "Inactive").length
            }
            description=""
            percentageChange=""
            isIncrease={false}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
          <div>
            <input
              type="text"
              placeholder="Search by employee or shift..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Shifts</option>
              {uniqueShifts.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-2">
          <TableComponent
            columns={columns}
            data={filteredAssignments}
            loading={false}
          />
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

export default ShiftAssignmentsMainArea;
