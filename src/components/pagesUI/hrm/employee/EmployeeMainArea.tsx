"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React, { useEffect, useState } from "react";
import EmployeeFilter from "./EmployeeFilter";
import Link from "next/link";
import { EyeIcon, TrashIcon } from "lucide-react";
import {
  useGetEmployeeListQuery,
  useDeleteEmployeeMutation,
} from "@/redux/slices/EmployeeAction";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import {
  useGetRolesQuery,
  useAssignUserToRoleMutation,
} from "@/redux/slices/RoleAction";
import { toast } from "sonner";
import DeleteModal from "@/components/common/DeleteModal";
import TableComponent from "@/components/ui/TableComponent";
import TableHeader from "@/components/common/TableHeader";
import { TableColumn } from "@/interface/tableComponent.interface";
import { useDebounce } from "@/hooks/useDebounce";
import PermissionGate from "@/components/PermissionGate";

const EmployeeMainArea = () => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data: departmentResponse, isLoading: isDepartmentsLoading } =
    useGetDepartmentListQuery({});
  const departments = departmentResponse?.data || [];

  const { data: rolesResponse } = useGetRolesQuery({});
  const debouncedSearch = useDebounce(searchTerm, 500);
  const roles = rolesResponse || [];

  const {
    data: employeeResponse,
    isLoading,
    refetch,
  } = useGetEmployeeListQuery({
    page: currentPage,
    search: debouncedSearch,
    limit: pageSize,
    ...(selectedDepartment && { departmentId: selectedDepartment }),
    ...(selectedStatus && { status: selectedStatus }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [
    currentPage,
    pageSize,
    searchTerm,
    selectedDepartment,
    selectedStatus,
    refetch,
  ]);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [assignUserToRole, { isLoading: isAssigningRole }] =
    useAssignUserToRoleMutation();

  const employeeList = employeeResponse?.data || [];
  const meta = employeeResponse?.meta;

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleRoleChange = async (employeeId: string, roleName: string) => {
    try {
      // Find the role ID from the selected role name
      const selectedRole = roles.find((role: any) => role.name === roleName);
      const roleId = selectedRole?.id;

      if (!roleId) {
        toast.error("Invalid role selected");
        return;
      }

      // Find the userId from the employee data
      const employee = employeeList.find((emp: any) => emp.id === employeeId);
      const userId = employee?.userId;

      if (!userId) {
        toast.error("User ID not found for this employee");
        return;
      }

      // Call the assign user to role mutation
      await assignUserToRole({
        userId: userId,
        roleId: roleId,
      }).unwrap();

      toast.success("Role updated successfully!");
      refetch();
    } catch (error: any) {
      // console.error("Failed to update role:", error);
      toast.error(error?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(deleteId).unwrap();
      toast.success("Employee deleted successfully!");
      setDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const columns: TableColumn<any>[] = [
    {
      key: "name",
      label: "Employee",
      sortable: true,
      render: (_, row) => (
        <Link
          href={`/employees/employee-profile/${row.id}`}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          {row.firstName} {row.lastName}
        </Link>
      ),
    },
    { key: "position", label: "Position", sortable: true },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (_, row) => row.department?.name || "N/A",
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", render: (value) => value || "N/A" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "hireDate",
      label: "Join Date",
      sortable: true,
      render: (value) => formatDate(value),
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (_, row) => (
        <PermissionGate
          permission="superadmin:assign_role:any"
          fallback={
            <span className="px-2 py-1 text-sm text-gray-700 dark:text-gray-300">
              {row.user?.role?.name || "No Role"}
            </span>
          }
        >
          <select
            value={row.user?.role?.name || ""}
            onChange={(e) => handleRoleChange(row.id, e.target.value)}
            disabled={isAssigningRole}
            className={`px-2 py-1 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm ${
              isAssigningRole ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select Role</option>
            {roles.map((role: any) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </PermissionGate>
      ),
    },
    {
      key: "action",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Link
            href={`/employees/employee-profile/${row.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <EyeIcon size={18} />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
          >
            <TrashIcon size={18} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="app__slide-wrapper">
        <div className="flex items-center justify-between">
          <Breadcrumb breadTitle="Employee" subTitle="Home" />
          <EmployeeFilter employeeData={employeeList} />
        </div>
        <div className="bg-white border border-gray-200 dark:border-gray-600 shadow-sm dark:bg-gray-800 rounded-lg">
          <TableHeader
            title="Employees"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search employees..."
            additionalFields={
              <>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept: any) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="TERMINATED">Terminated</option>
                </select>
              </>
            }
          />
          <TableComponent
            data={employeeList}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading || isDepartmentsLoading}
            emptyMessage="No employees found"
            pageSizeOptions={[5, 10, 15, 25, 50]}
            externalPagination={
              meta
                ? {
                    currentPage,
                    totalPages: meta.totalPages,
                    total: meta.total,
                    onPageChange: handlePageChange,
                    onPageSizeChange: handlePageSizeChange,
                  }
                : undefined
            }
          />
        </div>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDeleteFunc={handleDeleteConfirm}
        deleteId={0}
      />
    </>
  );
};

export default EmployeeMainArea;
