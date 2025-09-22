"use client";
import React from "react";
import {
  Clock,
  FileText,
  Calendar,
  User,
  CreditCard,
  Settings,
  ChevronRight,
} from "lucide-react";

const EmployeeQuickActions = () => {
  const quickActions = [
    {
      title: "Mark Attendance",
      description: "Check in/out for today",
      icon: Clock,
      color: "bg-green-500",
      href: "/attendance",
    },
    {
      title: "Apply Leave",
      description: "Request time off",
      icon: FileText,
      color: "bg-blue-500",
      href: "/leave",
    },
    {
      title: "View Calendar",
      description: "See upcoming events",
      icon: Calendar,
      color: "bg-purple-500",
      href: "/calendar",
    },
    {
      title: "Update Profile",
      description: "Manage your information",
      icon: User,
      color: "bg-orange-500",
      href: "/profile",
    },
    {
      title: "Payslips",
      description: "View salary details",
      icon: CreditCard,
      color: "bg-indigo-500",
      href: "/payroll",
    },
    {
      title: "Settings",
      description: "Preferences & security",
      icon: Settings,
      color: "bg-gray-500",
      href: "/settings",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;

          return (
            <button
              key={index}
              className="group p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md"
              onClick={() => {
                // In a real app, you would navigate to the respective page
                // Navigate to action
              }}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Frequently Used
        </h4>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  My Documents
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Access personal files
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Holiday Calendar
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  View company holidays
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Team Directory
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Find colleagues
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeQuickActions;
