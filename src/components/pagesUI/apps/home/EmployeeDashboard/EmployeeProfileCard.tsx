"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

const EmployeeProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        My Profile
      </h3>

      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user?.firstName?.charAt(0) || "U"}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user?.department || "Employee"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ID: {user?.employeeId || "EMP001"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Department:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.department || "Not Assigned"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Designation:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.designation || "Not Assigned"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Email:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.email || "Not Available"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Status:
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
