"use client";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { idType } from "@/interface/common.interface";
import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import { useGetEmployeeProfileQuery } from "@/redux/slices/EmployeeAction";
import { useGetEmployeeAttendanceQuery } from "@/redux/slices/AttendanceAction";
import TableComponent from "@/components/ui/TableComponent";

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
    { id: "leave", label: "Leave Requests", icon: "fa-solid fa-calendar-days" },
    { id: "payroll", label: "Payroll", icon: "fa-solid fa-credit-card" },
    { id: "assets", label: "Assets", icon: "fa-solid fa-laptop" },
    { id: "workshift", label: "Work & Shift", icon: "fa-solid fa-clock" },
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
          // console.error("Error processing attendance record:", error);
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

  // Render About Tab
  const renderAboutTab = () => (
    <div className="space-y-6">
      <PersonalInformation data={data} />

      {/* Additional About Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-briefcase text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Experience
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2.5 Years
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Performance
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                4.8/5
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-users text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Team Size
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                8 Members
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Attendance Tab
  const renderAttendanceTab = () => (
    <div className="space-y-6">
      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Present Days</p>
              <p className="text-2xl font-bold">22</p>
            </div>
            <i className="fa-solid fa-calendar-check text-2xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Absent Days</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <i className="fa-solid fa-calendar-xmark text-2xl text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Late Arrivals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <i className="fa-solid fa-clock text-2xl text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Overtime Hours</p>
              <p className="text-2xl font-bold">15h</p>
            </div>
            <i className="fa-solid fa-business-time text-2xl text-blue-200" />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Attendance
          </h3>
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
            {/* Sample leave requests */}
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
      {/* Salary Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Monthly Salary</h3>
            <p className="text-4xl font-bold">$5,500</p>
            <p className="text-blue-200 mt-2">
              Base Salary: $5,000 + Allowances: $500
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <i className="fa-solid fa-money-bill-wave text-6xl text-blue-200" />
              <p className="mt-4 text-lg">Next Payroll: Dec 30, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Earnings
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Basic Salary
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                $5,000
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">HRA</span>
              <span className="font-medium text-gray-900 dark:text-white">
                $200
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Transport Allowance
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                $150
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Medical Allowance
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                $150
              </span>
            </div>
            <hr className="border-gray-200 dark:border-gray-600" />
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-white">
                Total Earnings
              </span>
              <span className="text-green-600">$5,500</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Deductions
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="font-medium text-gray-900 dark:text-white">
                $550
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Provident Fund
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                $600
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Health Insurance
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                $100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Other</span>
              <span className="font-medium text-gray-900 dark:text-white">
                $50
              </span>
            </div>
            <hr className="border-gray-200 dark:border-gray-600" />
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-white">
                Total Deductions
              </span>
              <span className="text-red-600">$1,300</span>
            </div>
          </div>
        </div>
      </div>

      {/* Net Salary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Net Take Home Salary
          </h3>
          <p className="text-4xl font-bold text-green-600">$4,200</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            After all deductions
          </p>
        </div>
      </div>
    </div>
  );

  // Render Assets Tab
  const renderAssetsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Laptop */}
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

        {/* Phone */}
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

        {/* Monitor */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-desktop text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Dell Monitor
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Model: 27&quot; 4K
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Serial: DEL789456
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Request */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Request New Asset
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              New Request
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            Need additional equipment? Submit a request to IT department.
          </p>
        </div>
      </div>
    </div>
  );

  // Render Work & Shift Tab
  const renderWorkShiftTab = () => (
    <div className="space-y-6">
      {/* Current Work Details */}
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
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-map-marker-alt text-red-600" />
              <span className="text-gray-600 dark:text-gray-400">
                Work Location:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                Office
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
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-users text-teal-600" />
              <span className="text-gray-600 dark:text-gray-400">Team:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                Development Team
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weekly Schedule
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <div
                  key={day}
                  className={`p-4 rounded-lg ${index < 5 ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-700"}`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {day}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {index < 5 ? "9:00-18:00" : "Off"}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app__slide-wrapper">
      <Breadcrumb breadTitle="Employee Profile" subTitle="Home" />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              Loading employee profile...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
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
      )}

      {/* Main Content */}
      {!isLoading && !error && data && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Employee Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="px-6 py-8">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                  {data?.firstName?.[0]}
                  {data?.lastName?.[0]}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {data?.firstName} {data?.lastName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {data?.designation || "Software Developer"}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <i className="fa-solid fa-circle text-xs mr-2" />
                      Active
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Employee ID: {data?.employeeId || "EMP001"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined
                  </p>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 transition-all duration-200 ${
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
      )}
    </div>
  );
};

export default EmployeeProfileMainArea;
