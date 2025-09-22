"use client";
import React, { useState, useMemo } from "react";
import TableComponent from "@/components/ui/TableComponent";
import TableHeader from "@/components/common/TableHeader";
import {
  useGetAllAttendanceQuery,
  useGetMonthlyAttendanceQuery,
} from "@/redux/slices/AttendanceAction";
import { useGetDepartmentListQuery } from "@/redux/slices/DepartmentAction";
import { useGetEmployeesByDepartmentQuery } from "@/redux/slices/EmployeeAction";
import AdminAttendanceTable from "@/components/pagesUI/hrm/employee-attendance/AdminAttendanceTable";
// import BiometricAttendanceMainArea from "../biometric-attendance/BiometricAttendanceMainArea";

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div>
      {/* Table Skeleton */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-8 gap-4 p-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <div className="grid grid-cols-8 gap-4 p-4">
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface AttendanceRecord {
  id: string;
  name: string;
  status: "Present" | "Late" | "Absent";
  checkIn: string;
  checkOut: string;
  break: string;
  late: string;
  totalHours: string;
  employeeId: string;
}

interface ApiAttendanceRecord {
  id: string;
  employeeId: string;
  checkIn: string;
  checkOut: string;
  employee: {
    firstName: string;
    lastName: string;
    employeeId: string;
  };
  shift: {
    breakTime: number;
  };
}

type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

const columns = (
  // eslint-disable-next-line no-unused-vars -- Function signature requires parameter name
  handleEdit: (record: AttendanceRecord) => void
): TableColumn<AttendanceRecord>[] => [
  {
    key: "name",
    label: "Employee Name",
    sortable: true,
    render: (value) => (
      <span className="font-medium text-blue-600 hover:text-blue-800">
        {value}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === "Present"
            ? "bg-green-100 text-green-800"
            : value === "Late"
              ? "bg-orange-100 text-orange-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: "checkIn", label: "Check In", sortable: true },
  { key: "checkOut", label: "Check Out", sortable: true },
  { key: "break", label: "Break", sortable: true },
  { key: "late", label: "Late", sortable: true },
  { key: "totalHours", label: "Total Hours", sortable: true },
  {
    key: "action",
    label: "Action",
    render: (_, row) => (
      <div className="py-2 flex gap-2">
        <button className="text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <i className="fa-solid fa-trash" />
        </button>
        <button
          onClick={() => handleEdit(row)}
          className="text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <i className="fa-solid fa-edit" />
        </button>
      </div>
    ),
  },
];

const EmployeeAttendanceTable = () => {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();

  const [statusFilter, setStatusFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const [yearFilter, setYearFilter] = useState(currentYear);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState<"table" | "list">("table");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [updateData, setUpdateData] = useState({
    checkIn: "",
    checkOut: "",
    status: "Present" as "Present" | "Late" | "Absent",
  });

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: pageSize,
    }),
    [currentPage, pageSize]
  );

  const {
    data: attendanceResponse,
    // eslint-disable-next-line no-unused-vars -- Reserved for future error handling implementation
    error,
    isLoading,
  } = useGetAllAttendanceQuery(queryParams);

  const { data: monthlyAttendanceResponse, isLoading: isMonthlyLoading } =
    useGetMonthlyAttendanceQuery({
      year: parseInt(yearFilter),
      month: monthFilter.padStart(2, "0"),
    });

  const { data: departmentsResponse } = useGetDepartmentListQuery({});
  const departments = departmentsResponse?.data || [];

  const { data: employeesResponse } = useGetEmployeesByDepartmentQuery(
    departmentFilter,
    { skip: !departmentFilter }
  );
  const employees = employeesResponse?.data || [];

  const transformedData: AttendanceRecord[] = attendanceResponse?.data
    ? attendanceResponse.data.map((record: ApiAttendanceRecord) => {
        const checkInTime = new Date(record.checkIn);
        const checkOutTime = record.checkOut ? new Date(record.checkOut) : null;

        let totalHours = 0;
        let totalMinutes = 0;
        let checkOutDisplay = "-";

        if (checkOutTime) {
          const totalMs = checkOutTime.getTime() - checkInTime.getTime();
          totalHours = Math.floor(totalMs / (1000 * 60 * 60));
          totalMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
          checkOutDisplay = checkOutTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }

        return {
          id: record.id,
          employeeId: record.employeeId,
          name: `${record.employee.firstName} ${record.employee.lastName}`,
          status: checkOutTime ? ("Present" as const) : ("Absent" as const),
          checkIn: checkInTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          checkOut: checkOutDisplay,
          break: `${record.shift.breakTime}m`,
          late: "0m",
          totalHours: checkOutTime ? `${totalHours}h ${totalMinutes}m` : "0h",
        };
      })
    : [];

  const convertTo24Hour = (time12h: string) => {
    if (time12h === "-" || !time12h) return "";
    const [time, modifier] = time12h.split(" ");
    let [hours] = time.split(":");
    const minutes = time.split(":")[1];
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = String(parseInt(hours, 10) + 12);
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const handleEdit = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setUpdateData({
      checkIn: convertTo24Hour(record.checkIn),
      checkOut: convertTo24Hour(record.checkOut),
      status: record.status,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = () => {
    setShowUpdateModal(false);
    setSelectedRecord(null);
  };

  const filteredData = transformedData.filter((record) => {
    const matchesStatus = !statusFilter || record.status === statusFilter;
    return matchesStatus;
  });

  return (
    <div className="col-span-12 mt-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 gap-2">
      <TableHeader
        title="Employee Attendance"
        searchTerm={""}
        onSearchChange={() => {}}
        additionalFields={
          <>
            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`px-2 py-1 rounded transition-colors ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <i className="fa-solid fa-table" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-2 py-1 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <i className="fa-solid fa-list" />
              </button>
            </div>
            {viewMode === "list" && (
              <>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept: any) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <select
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                  disabled={!departmentFilter}
                >
                  <option value="">All Employees</option>
                  {employees.map((emp: any) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                >
                  <option value="">All Years</option>
                  {Array.from(
                    { length: 5 },
                    (_, i) => currentDate.getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </>
            )}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </>
        }
      />
      {isLoading ? (
        <SkeletonLoader />
      ) : viewMode === "table" ? (
        <TableComponent
          data={filteredData}
          columns={columns(handleEdit)}
          pageSize={pageSize}
          emptyMessage="No attendance records found"
          externalPagination={{
            currentPage,
            totalPages: attendanceResponse?.meta?.totalPages || 1,
            total: attendanceResponse?.meta?.total || 0,
            onPageChange: setCurrentPage,
            onPageSizeChange: (newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            },
          }}
        />
      ) : (
        <div className="mt-4">
          <AdminAttendanceTable
            attendanceData={monthlyAttendanceResponse || []}
            isLoading={isMonthlyLoading}
            selectedYear={parseInt(yearFilter)}
            selectedMonth={parseInt(monthFilter)}
          />
          {/* <BiometricAttendanceMainArea /> */}
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Update Attendance</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Employee: {selectedRecord.name}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check In
                </label>
                <input
                  type="time"
                  value={updateData.checkIn}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, checkIn: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check Out
                </label>
                <input
                  type="time"
                  value={updateData.checkOut}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, checkOut: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      status: e.target.value as "Present" | "Late" | "Absent",
                    })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendanceTable;
