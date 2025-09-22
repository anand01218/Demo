"use client";
import React, { useState } from "react";
import TableComponent from "@/components/ui/TableComponent";
import TableHeader from "@/components/common/TableHeader";
import { TableColumn } from "@/interface/tableComponent.interface";
import { Trash2 } from "lucide-react";
import {
  useGetLeavesQuery,
  useUpdateLeaveMutation,
} from "@/redux/slices/LeaveRequestAction";
import { toast } from "sonner";

// Skeleton Loader Component
const LeaveTableSkeleton = () => {
  return (
    <div className="w-full">
      {/* Table Header Skeleton */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32" />
          <div className="flex gap-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-48" />
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32" />
          </div>
        </div>
      </div>

      {/* Table Structure */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-7 gap-4 p-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16" />
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-600 last:border-b-0"
            style={{
              backgroundColor:
                index % 2 === 0 ? "transparent" : "rgba(249, 250, 251, 0.5)",
            }}
          >
            <div className="grid grid-cols-7 gap-4 p-4 items-center">
              {/* Employee Name */}
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: `${Math.floor(Math.random() * 30) + 70}%`,
                  opacity: 0.6 + Math.random() * 0.3,
                }}
              />

              {/* Leave Type */}
              <div
                className="h-6 bg-blue-200 dark:bg-blue-800 rounded-full"
                style={{
                  width: `${Math.floor(Math.random() * 20) + 80}%`,
                  opacity: 0.7,
                }}
              />

              {/* From Date */}
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: "80%",
                  opacity: 0.6,
                }}
              />

              {/* To Date */}
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: "80%",
                  opacity: 0.6,
                }}
              />

              {/* No of Days */}
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: "60%",
                  opacity: 0.7,
                }}
              />

              {/* Status */}
              <div
                className={`h-6 rounded-full ${
                  index % 3 === 0
                    ? "bg-green-200 dark:bg-green-800"
                    : index % 3 === 1
                      ? "bg-yellow-200 dark:bg-yellow-800"
                      : "bg-red-200 dark:bg-red-800"
                }`}
                style={{
                  width: "70%",
                  opacity: 0.7,
                }}
              />

              {/* Actions */}
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded opacity-60" />
                <div className="w-6 h-6 bg-red-200 dark:bg-red-800 rounded opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-40 opacity-70" />
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

interface LeaveRecord {
  id: string;
  depId: string;
  empId: string;
  leaveType: string;
  from: string;
  to: string;
  noOfDays: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  note: string;
  createdAt: string;
  updatedAt: string;
  department: {
    id: string;
    name: string;
  };
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const LeaveTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: leavesData,
    isLoading,
    error,
    refetch,
  } = useGetLeavesQuery({ page: currentPage, limit: pageSize });
  const [updateLeave] = useUpdateLeaveMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRecord | null>(null);
  const [reason, setReason] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (leave: LeaveRecord) => {
    setSelectedLeave(leave);
    setReason("");
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // Add delete API call here when available
      toast.success("Leave record deleted successfully");
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const columns: TableColumn<LeaveRecord>[] = [
    {
      key: "employee",
      label: "Employee Name",
      sortable: true,
      render: (value, row) => (
        <span className="font-medium">
          {row.employee.firstName} {row.employee.lastName}
        </span>
      ),
    },
    {
      key: "leaveType",
      label: "Leave Type",
      sortable: true,
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value === "Annual Leave"
              ? "bg-blue-100 text-blue-800"
              : value === "Sick Leave"
                ? "bg-red-100 text-red-800"
                : "bg-orange-100 text-orange-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "from",
      label: "From",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "to",
      label: "To",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "noOfDays",
      label: "No of Days",
      sortable: true,
      render: (value) => <span className="font-semibold">{value} days</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "APPROVED"
              ? "bg-green-100 text-green-800"
              : value === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (_, row) => (
        <div className="flex gap-2">
          {row.status === "PENDING" && (
            <button
              onClick={() => handleEdit(row)}
              className="text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-edit" />
            </button>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleAccept = async () => {
    if (selectedLeave) {
      try {
        await updateLeave({
          id: selectedLeave.id,
          status: "APPROVED",
          note: reason,
        }).unwrap();
        toast.success("Leave request approved successfully");
        refetch();
        setShowModal(false);
        setReason("");
        setSelectedLeave(null);
      } catch (error) {
        toast.error("Failed to approve leave request");
      }
    }
  };

  const handleReject = async () => {
    if (selectedLeave) {
      try {
        await updateLeave({
          id: selectedLeave.id,
          status: "REJECTED",
          note: reason,
        }).unwrap();
        toast.success("Leave request rejected successfully");
        refetch();
        setShowModal(false);
        setReason("");
        setSelectedLeave(null);
      } catch (error) {
        toast.error("Failed to reject leave request");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setReason("");
    setSelectedLeave(null);
  };

  const leaveRecords = leavesData?.data || [];
  const meta = leavesData?.meta;

  interface FilteredLeaveRecord {
    employee: {
      firstName: string;
      lastName: string;
    };
    leaveType: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
  }

  const filteredData: LeaveRecord[] = leaveRecords.filter(
    (record: FilteredLeaveRecord & LeaveRecord) => {
      const fullName: string = `${record.employee.firstName} ${record.employee.lastName}`;
      const matchesSearch: boolean =
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus: boolean =
        !statusFilter || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  if (isLoading) {
    return (
      <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 px-4 py-4 shadow-sm border border-gray-200 dark:border-gray-600 rounded-lg">
        <LeaveTableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 px-4 py-4 shadow-sm border border-gray-200 dark:border-gray-600 rounded-lg">
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">Error loading leave data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 gap-2 shadow-sm border border-gray-200 dark:border-gray-600">
      <TableHeader
        title="Leave Records"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search leave records..."
        additionalFields={
          <>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
            >
              <option value="">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </>
        }
      />
      <TableComponent
        data={filteredData}
        columns={columns}
        pageSize={pageSize}
        emptyMessage="No leave records found"
        externalPagination={{
          currentPage: meta?.page || 1,
          totalPages: meta?.totalPages || 1,
          total: meta?.total || 0,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => {
            setPageSize(size);
            setCurrentPage(1);
          },
        }}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Leave Request Action</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Leave request for {selectedLeave?.employee.firstName}{" "}
              {selectedLeave?.employee.lastName}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none h-24 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Leave Record</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this leave record? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTable;
