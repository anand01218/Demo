"use client";
import TableComponent from "@/components/ui/TableComponent";
import { useGetSystemStatsQuery } from "@/redux/slices/DashboardAction";
import { useGetAllAttendanceQuery } from "@/redux/slices/AttendanceAction";
import DashboardHeader from "@/components/common/DashboardHeader";
import { useState, useMemo } from "react";

const RecentEmployee = () => {
  const { data: statsData, isLoading } = useGetSystemStatsQuery({});
  const { data: attendanceData, isLoading: attendanceLoading } =
    useGetAllAttendanceQuery({ page: 1, limit: 1000 });
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [absentSearchTerm, setAbsentSearchTerm] = useState("");

  const filteredRecentEmployees = useMemo(() => {
    const recentEmployees = statsData?.recentEmployees || [];
    if (!recentEmployees.length) return [];
    if (!employeeSearchTerm) return recentEmployees;

    return recentEmployees.filter((employee: any) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const email = employee.email?.toLowerCase() || "";
      const position = employee.position?.toLowerCase() || "";
      const searchLower = employeeSearchTerm.toLowerCase();

      return (
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        position.includes(searchLower)
      );
    });
  }, [statsData?.recentEmployees, employeeSearchTerm]);

  const absentEmployees = useMemo(() => {
    if (!attendanceData?.data) return [];
    return attendanceData.data
      .filter((record: any) => !record.checkOut)
      .map((record: any) => ({
        employee: `${record.employee.firstName} ${record.employee.lastName}`,
        status: "ABSENT",
      }));
  }, [attendanceData]);

  const filteredAbsentEmployees = useMemo(() => {
    if (!absentEmployees.length) return [];
    if (!absentSearchTerm) return absentEmployees;

    return absentEmployees.filter((employee: any) => {
      const employeeName = employee.employee.toLowerCase();
      const searchLower = absentSearchTerm.toLowerCase();

      return employeeName.includes(searchLower);
    });
  }, [absentEmployees, absentSearchTerm]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const employeeColumns = [
    {
      key: "name",
      label: "Name",
      render: (value: any, row: any) => `${row.firstName} ${row.lastName}`,
    },
    { key: "email", label: "Email" },
    {
      key: "hireDate",
      label: "Hire Date",
      render: (value: any) => formatDate(value),
    },
    { key: "position", label: "Position" },
    {
      key: "status",
      label: "Status",
      render: (value: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "ACTIVE"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : value === "CONFIRMED"
                ? "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                : value === "PROBATION"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const absentColumns = [
    { key: "employee", label: "Employee" },
    {
      key: "status",
      label: "Status",
      render: (value: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "ABSENT"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="w-full">
        {/* Recent Employees Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 no-height">
          {/* <div className="card__title-wrap flex border-b border-gray-200 dark:border-gray-700 items-center justify-between py-3 mb-[10px]">
            <h5 className="card__heading-title">Recent Employees</h5>
          </div> */}
          <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
            <DashboardHeader
              title="Recent Employees"
              searchTerm={employeeSearchTerm}
              onSearchChange={setEmployeeSearchTerm}
              searchPlaceholder="Search employees..."
            />
          </div>
          <TableComponent
            data={filteredRecentEmployees}
            columns={employeeColumns}
            loading={isLoading}
            pageSize={10}
            emptyMessage="No recent employees found"
            height="330px"
            showPaginationControls={false}
            className="rounded-none border-0"
          />
        </div>
        {/* Absent Today Section */}
        <div className="bg-white mt-4 dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 no-height">
          <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
            <DashboardHeader
              title="Employees Absent Today"
              searchTerm={absentSearchTerm}
              onSearchChange={setAbsentSearchTerm}
              searchPlaceholder="Search absent employees..."
            />
          </div>
          <TableComponent
            data={filteredAbsentEmployees}
            columns={absentColumns}
            height="400px"
            loading={attendanceLoading}
            pageSize={10}
            emptyMessage="No absent employees today"
            showPaginationControls={false}
            className="rounded-none border-0 shadow-none"
          />
        </div>
      </div>
    </>
  );
};

export default RecentEmployee;
