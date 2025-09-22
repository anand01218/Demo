"use client";
import React from "react";
import { Calendar, FileText } from "lucide-react";

const EmployeeLeaveCard = () => {
  // Mock data - in real app, this would come from API
  const leaveData = {
    totalLeaves: 24,
    usedLeaves: 8,
    remainingLeaves: 16,
    pendingRequests: 1,
    approvedRequests: 3,
    rejectedRequests: 0,
  };

  const recentLeaves = [
    {
      id: 1,
      type: "Sick Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      status: "Approved",
      days: 2,
    },
    {
      id: 2,
      type: "Annual Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      status: "Pending",
      days: 3,
    },
    {
      id: 3,
      type: "Personal Leave",
      startDate: "2024-01-10",
      endDate: "2024-01-10",
      status: "Approved",
      days: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Leave Summary
      </h3>

      {/* Leave Balance */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {leaveData.totalLeaves}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">Total</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {leaveData.usedLeaves}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">Used</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {leaveData.remainingLeaves}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">Remaining</p>
        </div>
      </div>

      {/* Leave Statistics */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-yellow-600">
              {leaveData.pendingRequests}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Pending</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              {leaveData.approvedRequests}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Approved</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-600">
              {leaveData.rejectedRequests}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Rejected</p>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Recent Requests
        </h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {recentLeaves.map((leave) => (
            <div
              key={leave.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {leave.type}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {leave.startDate} - {leave.endDate} ({leave.days} day
                  {leave.days > 1 ? "s" : ""})
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}
              >
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
          <FileText className="w-4 h-4 mr-2" />
          Apply for Leave
        </button>
        <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition-colors">
          View Leave History
        </button>
      </div>
    </div>
  );
};

export default EmployeeLeaveCard;
