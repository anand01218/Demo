"use client";
import React from "react";
import { usePermission } from "@/hooks/usePermissionProvider";
import { PERMISSIONS } from "@/constants/permissions";
import EmployeeProfileCard from "./EmployeeProfileCard";
import EmployeeAttendanceCard from "./EmployeeAttendanceCard";
import EmployeeLeaveCard from "./EmployeeLeaveCard";
import SmallCalendar from "@/components/common/SmallCalendar";
import MyTasks from "@/components/common/MyTasks";

const EmployeeDashboard = () => {
  const { hasPermission } = usePermission();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Welcome Banner */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here&apos;s what&apos;s happening with your work today.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="mb-6">
        <EmployeeQuickActions />
      </div> */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <EmployeeProfileCard />
        </div>

        {/* Attendance Card */}
        {hasPermission(PERMISSIONS.ATTENDANCE_READ_SELF) && (
          <div className="lg:col-span-1">
            <EmployeeAttendanceCard />
          </div>
        )}

        {/* Calendar */}
        <div className="lg:col-span-1">
          <SmallCalendar />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Leave Summary */}
        {hasPermission(PERMISSIONS.LEAVE_READ_SELF) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <EmployeeLeaveCard />
          </div>
        )}

        {/* My Tasks */}
        <div>
          <MyTasks />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Attendance marked for today
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Profile updated
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                1 day ago
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Leave request submitted
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                3 days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
