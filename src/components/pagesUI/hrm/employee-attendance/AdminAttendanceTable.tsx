"use client";
import React from "react";
import AttendanceTypeIcons from "./AttendanceTypeIcons";
import Link from "next/link";
import TableComponent from "@/components/ui/TableComponent";

interface AdminAttendanceTableProps {
  attendanceData: any[];
  isLoading: boolean;
  selectedYear: number;
  selectedMonth: number;
}

const AdminAttendanceTable: React.FC<AdminAttendanceTableProps> = ({
  attendanceData,
  isLoading,
  selectedYear,
  selectedMonth,
}) => {
  const filteredData = attendanceData;

  const getWeekdayName = (dateIndex: number) => {
    const date = new Date(selectedYear, selectedMonth - 1, dateIndex + 1);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const AttendanceCell = ({ dateKey, row }: { dateKey: string; row: any }) => {
    const targetDate = parseInt(dateKey.replace("date", ""));

    // Find attendance record for the specific date
    const attendanceRecord = row.attendance?.find((att: any) => {
      const checkInDate = new Date(att.checkIn);
      return (
        checkInDate.getDate() === targetDate &&
        checkInDate.getMonth() === selectedMonth - 1 &&
        checkInDate.getFullYear() === selectedYear
      );
    });

    // If no attendance record, show absent
    if (!attendanceRecord) {
      return (
        <button className="flex justify-center items-center">
          <i className="fas fa-times text-red-500" title="Absent" />
        </button>
      );
    }

    // Show check icon if approved, X icon if not approved
    const isApproved = attendanceRecord.isApproved;

    return (
      <button
        className="flex justify-center items-center"
        title={isApproved ? "Approved" : "Not Approved"}
      >
        {isApproved ? (
          <i className="fas fa-check text-green-500" />
        ) : (
          <i className="fas fa-times text-red-500" />
        )}
      </button>
    );
  };

  const generateDateKeys = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `date${i + 1}`);
  };

  const dateKeys = generateDateKeys();

  const columns = [
    {
      key: "employee",
      label: "Employee",
      render: (value: any, row: any) => (
        <div className="flex flex-col">
          <Link
            href={`/hrm/employee-profile/${row.employeeId}`}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            {row.employeeName}
          </Link>
          <span className="text-sm text-gray-500">{row.department?.name}</span>
        </div>
      ),
    },
    ...dateKeys.map((dateKey, index) => ({
      key: dateKey,
      label: `${dateKey.replace("date", "")} ${getWeekdayName(index)}`,
      render: (value: any, row: any) => (
        <AttendanceCell dateKey={dateKey} row={row} />
      ),
    })),
  ];

  return (
    <div className="col-span-12">
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg">
        <AttendanceTypeIcons />
        <TableComponent
          data={filteredData}
          columns={columns}
          pageSize={10}
          emptyMessage="No employees found"
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminAttendanceTable;
