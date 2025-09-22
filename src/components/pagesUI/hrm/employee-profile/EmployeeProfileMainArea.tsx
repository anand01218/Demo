"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { idType } from "@/interface/common.interface";
import React, { useState } from "react";
import { useGetEmployeeProfileQuery } from "@/redux/slices/EmployeeAction";
import { useGetEmployeeAttendanceQuery } from "@/redux/slices/AttendanceAction";
import TableComponent from "@/components/ui/TableComponent";
import SummarySingleCard from "@/components/common/SummarySingleCard";
import Header from "@/components/common/Header";
import { User } from "lucide-react";
// Tab interfaces
interface TabItem {
  id: string;
  label: string;
  icon: string;
}

const EmployeeProfileMainArea = ({ id }: idType) => {
  const [activeTab, setActiveTab] = useState("about");

  const {
    data: employeeProfile,
    isLoading,
    error,
  } = useGetEmployeeProfileQuery(id);
  const { data: attendanceData } = useGetEmployeeAttendanceQuery(id);
  const data = employeeProfile?.data || employeeProfile;

  // Tab configuration
  const tabs: TabItem[] = [
    { id: "about", label: "About", icon: "fa-solid fa-user" },
    {
      id: "attendance",
      label: "Attendance",
      icon: "fa-solid fa-calendar-check",
    },
    { id: "workshift", label: "Work & Shift", icon: "fa-solid fa-clock" },
    { id: "leave", label: "Leave Requests", icon: "fa-solid fa-calendar-days" },
    { id: "payroll", label: "Payroll", icon: "fa-solid fa-credit-card" },
    { id: "assets", label: "Assets", icon: "fa-solid fa-laptop" },
  ];

  // Helper function to safely render values
  const safeRender = (value: any, fallback: string = "N/A"): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    if (typeof value === "object" && value !== null) {
      return value.name || value.title || value.label || fallback;
    }
    return fallback;
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Employee Profile" subTitle="Home" />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              Loading employee profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Employee Profile" subTitle="Home" />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl" />
            </div>
            <p className="text-red-600 font-medium">
              Error loading employee profile
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </div>
    );
  }

  const attendanceColumns = [
    { key: "date", label: "Date", sortable: true },
    { key: "checkIn", label: "Check In", sortable: true },
    { key: "checkOut", label: "Check Out", sortable: true },
    { key: "shift", label: "Shift", sortable: true },
    { key: "location", label: "Location", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Present"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "totalHours", label: "Total Hours", sortable: true },
  ];

  const transformedAttendanceData = Array.isArray(attendanceData)
    ? attendanceData.map((record: any) => {
        try {
          return {
            date: new Date(record.checkIn).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            checkIn: new Date(record.checkIn).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            checkOut: record.checkOut
              ? new Date(record.checkOut).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "-",
            shift: safeRender(record.shift),
            location: safeRender(record.location),
            status: record.checkOut ? "Present" : "Absent",
            totalHours: record.checkOut
              ? (() => {
                  const totalMs =
                    new Date(record.checkOut).getTime() -
                    new Date(record.checkIn).getTime();
                  const hours = Math.floor(totalMs / (1000 * 60 * 60));
                  const minutes = Math.floor(
                    (totalMs % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  return `${hours}h ${minutes}m`;
                })()
              : "0h",
          };
        } catch (error) {
          // Error processing attendance record
          return {
            date: "Invalid Date",
            checkIn: "-",
            checkOut: "-",
            shift: "N/A",
            location: "N/A",
            status: "Unknown",
            totalHours: "0h",
          };
        }
      })
    : [];

  // Render About Tab with 3 separate cards
  const renderAboutTab = () => (
    <div className="space-y-6">
      {/* Three Main Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Personal Information Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <Header title="Personal Information" />
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {/* <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Employee ID</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data?.employeeId || 'EMP001'}
                </span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Date of Birth
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data?.dateOfBirth
                    ? new Date(data.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Gender
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.gender)}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Address
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-right max-w-[60%]">
                  {safeRender(data?.address)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Country
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.country)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  State
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.state)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  City
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.city)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Qualification
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.qualification || data?.education)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data?.status === "ACTIVE"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {safeRender(data?.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Work Information Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <Header title="Work Information" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Department
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.department)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Job Position
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.position || data?.designation)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Shift Information
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(
                    data?.shift || data?.workingShift || "9:00 AM - 6:00 PM"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Employee Type
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  {safeRender(
                    data?.employeeType || data?.employmentType || "Full-time"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Work Location
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(data?.workLocation || data?.location || "Office")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Work Type
                </span>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                  {safeRender(data?.workingDayType || data?.workType)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Role
                </span>
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-xs font-medium">
                  {safeRender(data?.user?.role || data?.role)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Monthly Salary
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ₹ {safeRender(data?.salary)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <Header title="Bank Details" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bank Name
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(
                    data?.bankName || data?.bank?.name || "State Bank of India"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Branch
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {safeRender(
                    data?.bankBranch || data?.bank?.branch || "Main Branch"
                  )}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bank Address
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-right max-w-[60%]">
                  {safeRender(
                    data?.bankAddress ||
                      data?.bank?.address ||
                      "123 Bank Street, Financial District"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Account Number
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                  {(() => {
                    const accountNumber =
                      data?.accountNumber ||
                      data?.bank?.accountNumber ||
                      "1234567890123456";
                    const maskedNumber = accountNumber.replace(
                      /\d(?=\d{4})/g,
                      "*"
                    );
                    return maskedNumber;
                  })()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  IFSC Code
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                  {safeRender(
                    data?.ifscCode || data?.bank?.ifscCode || "SBIN0001234"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Account Type
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  {safeRender(
                    data?.accountType || data?.bank?.accountType || "Savings"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Verification Status
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data?.bankVerified || true
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  {data?.bankVerified || true ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  <i className="fa-solid fa-download text-xs"></i>
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  <i className="fa-solid fa-edit text-xs"></i>
                  Update
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-calendar-days text-blue-600 dark:text-blue-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">2.5 Years</p>
            </div>
          </div>
        </div> */}

        <SummarySingleCard
          title="Experience"
          value="2.5"
          iconClass="fa-solid fa-calendar-days"
        />

        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-green-600 dark:text-green-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Performance</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">4.8/5</p>
            </div>
          </div>
        </div> */}

        <SummarySingleCard
          title="Performance"
          value="4.8/5"
          iconClass="fa-solid fa-chart-line"
        />

        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-users text-purple-600 dark:text-purple-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Team Size</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">8 Members</p>
            </div>
          </div>
        </div> */}

        <SummarySingleCard
          title="Team Size Members"
          value="8"
          iconClass="fa-solid fa-users"
        />

        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-award text-orange-600 dark:text-orange-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">12 Done</p>
            </div>
          </div>
        </div> */}

        <SummarySingleCard
          title="Done Projects"
          value="12"
          iconClass="fa-solid fa-award"
        />
      </div>
    </div>
  );

  // Render Attendance Tab
  const renderAttendanceTab = () => (
    <div className="space-y-4">
      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Present Days</p>
              <p className="text-2xl font-bold">22</p>
            </div>
            <i className="fa-solid fa-calendar-check text-2xl text-green-200"></i>
          </div>
        </div> */}
        <SummarySingleCard
          title="Present Days"
          value="22"
          iconClass="fa-solid fa-calendar-check"
        />
        {/* <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Absent Days</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <i className="fa-solid fa-calendar-xmark text-2xl text-red-200"></i>
          </div>
        </div> */}
        <SummarySingleCard
          title="Absent Days"
          value="2"
          iconClass="fa-solid fa-calendar-xmark"
        />
        {/* <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Late Arrivals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <i className="fa-solid fa-clock text-2xl text-yellow-200"></i>
          </div>
        </div> */}
        <SummarySingleCard
          title="Late Arrivals"
          value="3"
          iconClass="fa-solid fa-clock"
        />
        {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Overtime Hours</p>
              <p className="text-2xl font-bold">15h</p>
            </div>
            <i className="fa-solid fa-business-time text-2xl text-blue-200"></i>
          </div>
        </div> */}
        <SummarySingleCard
          title="Overtime Hours"
          value="15h"
          iconClass="fa-solid fa-business-time"
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Header title="Attendance" />
        </div>
        <div className="p-6">
          <TableComponent
            data={transformedAttendanceData}
            columns={attendanceColumns}
            pageSize={10}
            height="400px"
            emptyMessage="No attendance records found"
          />
        </div>
      </div>
    </div>
  );

  // Render Leave Tab
  const renderLeaveTab = () => (
    <div className="space-y-6">
      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-umbrella-beach text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Annual Leave
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-blue-600">12</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                / 20 days
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-doctor text-green-600 dark:text-green-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sick Leave
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-green-600">8</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                / 10 days
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-calendar-plus text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Leave
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-purple-600">3</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                / 5 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leave Requests
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              New Request
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-umbrella-beach text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Annual Leave
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dec 25 - Dec 30, 2024
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                Approved
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-user-doctor text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Sick Leave
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nov 15 - Nov 16, 2024
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Payroll Tab
  const renderPayrollTab = () => (
    <div className="space-y-6">
      {/* Current Salary Overview */}
      <div className="bg-white p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummarySingleCard
            title="Basic Salary"
            value="₹ 50,000"
            iconClass="fa-solid fa-sack-dollar"
          />
          <SummarySingleCard
            title="Bonus"
            value="₹ 5,000"
            iconClass="fa-solid fa-gift"
          />
          <SummarySingleCard
            title="Total Salary"
            value="₹ 55,000"
            iconClass="fa-solid fa-sack-dollar"
          />
        </div>
      </div>

      {/* Salary Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <Header title="Earnings" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Basic Salary
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 35,000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  HRA (40%)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 14,000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Transport Allowance
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 3,000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Medical Allowance
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 2,000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Special Allowance
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 1,000
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Total Earnings
                  </span>
                  <span className="text-base font-bold text-green-600 dark:text-green-400">
                    ₹ 55,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <Header title="Deductions" />
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  EPF (12%)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 4,200
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ESI (0.75%)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 413
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Professional Tax
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 200
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Income Tax (TDS)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 8,187
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Other Deductions
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹ 0
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Total Deductions
                  </span>
                  <span className="text-base font-bold text-red-600 dark:text-red-400">
                    ₹ 13,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-file-invoice text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tax Information
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Annual CTC
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ₹ 6,60,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tax Deducted (YTD)
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ₹ 65,496
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                PAN Number
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ABCDE1234F
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-shield-alt text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Benefits
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Health Insurance
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                Active
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Life Insurance
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                Active
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                PF Account
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                MH/12345/678
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Assets Tab
  const renderAssetsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-laptop text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                MacBook Pro
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Model: 2023 M2
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Serial: ABC123456
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-mobile-alt text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                iPhone 14
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Model: Pro Max
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                IMEI: 123456789012345
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Work & Shift Tab
  const renderWorkShiftTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Shift
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-clock text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">
                Shift Time:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                9:00 AM - 6:00 PM
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-calendar text-green-600" />
              <span className="text-gray-600 dark:text-gray-400">
                Working Days:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                Monday - Friday
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Work Type
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-briefcase text-purple-600" />
              <span className="text-gray-600 dark:text-gray-400">
                Employment Type:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                Full-time
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-home text-orange-600" />
              <span className="text-gray-600 dark:text-gray-400">
                Remote Work:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                2 days/week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app__slide-wrapper">
      <Breadcrumb breadTitle="Employee Profile" subTitle="Home" />

      {/* Main Content */}
      <div className="mx-auto py-2">
        {/* Employee Header */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-transparent border-2 border-blue-600 dark:border-gray-700 rounded-full flex items-center justify-center text-white">
                <User className="w-12 h-12 text-blue-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {data?.firstName} {data?.lastName}
                </h1>
                <span className="text-md text-gray-600 dark:text-gray-400 mt-1">
                  {data?.designation || "Software Developer"}
                </span>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="inline-flex items-center px-3 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                  {(() => {
                    const email =
                      data?.email?.replace?.("mailto:", "") ||
                      data?.user?.email?.replace?.("mailto:", "") ||
                      "";
                    return email ? (
                      <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-envelope text-green-600 dark:text-green-400 text-sm" />
                        <a
                          href={`mailto:${email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {email}
                        </a>
                      </div>
                    ) : null;
                  })()}
                </div>
                <div className="flex items-center space-x-6 mt-3">
                  {data?.phone && (
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-phone text-blue-600 dark:text-blue-400 text-sm" />
                      <a
                        href={`tel:${data.phone}`}
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {data.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Joined
                </span>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data?.joiningDate
                    ? new Date(data.joiningDate).toLocaleDateString()
                    : "Jan 15, 2022"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow-sm mb-3">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 my-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <i className={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === "about" && renderAboutTab()}
          {activeTab === "attendance" && renderAttendanceTab()}
          {activeTab === "leave" && renderLeaveTab()}
          {activeTab === "payroll" && renderPayrollTab()}
          {activeTab === "assets" && renderAssetsTab()}
          {activeTab === "workshift" && renderWorkShiftTab()}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileMainArea;
